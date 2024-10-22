export const pluralize = (
    count,
    noun,
    onlyNoun
  ) => {
    if (count === 1) {
      return onlyNoun ? noun : `${count} ${noun}`;
    } else {
      if (
        noun.endsWith("s") ||
        noun.endsWith("x") ||
        noun.endsWith("z") ||
        noun.endsWith("ch") ||
        noun.endsWith("sh")
      ) {
        return onlyNoun ? `${noun}es` : `${count} ${noun}es`;
      } else if (noun.endsWith("y")) {
        const baseNoun = noun.slice(0, -1);
        return onlyNoun ? `${baseNoun}ies` : `${count} ${baseNoun}ies`;
      } else {
        return onlyNoun ? `${noun}s` : `${count} ${noun}s`;
      }
    }
  };