export default function TruncateText(text: string, length: number) {
    if (text != null) {
      if (typeof text == "string") {
        if (text.length <= length) {
          return text;
        } else {
          return text.substring(0, length) + "...";
        }
      } else if (typeof text == "number") {
        const numberToString = JSON.stringify(text);
        if (numberToString.length <= length) {
          return numberToString;
        } else {
          return numberToString.substring(0, length) + "...";
        }
      }
    }
  }