import { load, CheerioAPI } from "cheerio";
import axios from "axios";

import { Gogoanime, GogoEpisode, SubOrDub } from "../models";

export const BASE_URL = "https://gogoanime.gg/";
const ajax_url = "https://ajax.gogo-load.com/";
const list_episodes_url = `${ajax_url}ajax/load-list-episode`;
export const recent_release_url = `${ajax_url}ajax/page-recent-release.html`;

/**
 * @param {string} id anime id.
 * @returns Resolves when the scraping is complete.
 * @example
 * scrapeGoGoAnimeInfo({id: "naruto"})
 * .then((res) => console.log(res)) // => The anime information is returned in an Object.
 * .catch((err) => console.log(err))
 *
 */
export const scrapeAnimeDetails = async (id: string): Promise<Gogoanime | undefined> => {
  try {
    const genres: string[] = [];
    const epList: GogoEpisode[] = [];

    const animePageTest = await axios.get(`${BASE_URL}category/${id}`);

    const $ = load(animePageTest.data);

    const animeTitle = $("div.anime_info_body_bg > h1").text().trim();
    const animeImage = $("div.anime_info_body_bg > img").attr("src");
    const type = $("div.anime_info_body_bg > p:nth-child(4) > a").text().trim();
    const desc = $("div.anime_info_body_bg > p:nth-child(5)").text().replace("Plot Summary: ", "").trim();
    const releasedDate = parseInt(
      $("div.anime_info_body_bg > p:nth-child(7)").text().replace("Released: ", "").trim()
    );
    const status = $("div.anime_info_body_bg > p:nth-child(8) > a").text().trim();
    const otherName = $("div.anime_info_body_bg > p:nth-child(9)")
      .text()
      .replace("Other name: ", "")
      .replace(/;/g, ",")
      .split(",")
      .map((name) => name.trim());

    $("div.anime_info_body_bg > p:nth-child(6) > a").each((i, elem) => {
      genres.push($(elem).attr("title")!.trim());
    });

    let subOrDub: SubOrDub = SubOrDub.SUB;

    if (animeTitle.toLowerCase().includes("(dub)")) {
      subOrDub = SubOrDub.DUB;
    }

    const ep_start = $("#episode_page > li").first().find("a").attr("ep_start");
    const ep_end = parseInt($("#episode_page > li").last().find("a").attr("ep_end") ?? "0");
    const movie_id = $("#movie_id").attr("value");
    const alias = $("#alias_anime").attr("value");

    const html = await axios.get(
      `${list_episodes_url}?ep_start=${ep_start}&ep_end=${ep_end}&id=${movie_id}&default_ep=${0}&alias=${alias}`
    );
    const $$ = load(html.data);

    $$("#episode_related > li").each((i, el) => {
      epList.push({
        id: $(el).find("a").attr("href")?.split("/")[1]!,
        number: parseInt($(el).find(`div.name`).text().replace("EP ", "")),
        url: `${BASE_URL}${$(el).find(`a`).attr("href")?.trim()}`,
      });
    });

    return {
      id: id,
      url: `${BASE_URL}category/${id}`,
      title: animeTitle,
      subOrDub: subOrDub,
      type: type,
      genres: genres,
      releasedDate: releasedDate,
      status: status,
      otherNames: otherName,
      description: desc,
      image: animeImage,
      totalEpisodes: ep_end,
      episodes: epList,
    };
  } catch (err) {
    throw (err as Error).message;
  }
};

export const scrapeRecentRelease = async ($: CheerioAPI): Promise<Gogoanime[] | undefined> => {
  const list: Gogoanime[] = [];
  try {
    const items = $("div.last_episodes.loaddub > ul").children();
    for (const anime of items) {
      let id = $(anime).find("a").attr("href")?.split("/")[1].split("-episode")[0]!;
      if (id == "tate-no-yuusha-no-nariagari-season-2") {
        id = "tate-no-yuusha-no-nariagari-2nd-season";
      }
      const animeDetails = await scrapeAnimeDetails(id);

      if (animeDetails) {
        list.push(animeDetails);
      }
    }

    return list;
  } catch (err) {
    console.log(err);
    return [];
  }
};
