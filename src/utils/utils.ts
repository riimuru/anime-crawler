export const colors = {
  reset: "\x1b[0m",

  //text color

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  //background color

  blackBg: "\x1b[40m",
  redBg: "\x1b[41m",
  greenBg: "\x1b[42m",
  yellowBg: "\x1b[43m",
  blueBg: "\x1b[44m",
  magentaBg: "\x1b[45m",
  cyanBg: "\x1b[46m",
  whiteBg: "\x1b[47m",
};

export const logger = {
  info: (message: any, color: string = colors.white) => {
    console.log(`${color}${message}${colors.reset}`);
  },

  warn: (message: any) => {
    console.log(`${colors.yellow}Warning: ${message}${colors.reset}`);
  },

  error: (message: any) => {
    console.log(`${colors.red}Error: ${message}${colors.reset}`);
  },
};

export const animelistSuffixes = [".html"];
