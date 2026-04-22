const ValidationRules: Record<string, ((v: string) => true | string)[]> = { // Record have string value, eacg function accept string value and return true if valid, return string of invalid
    email: [
        (v: string) => !!v || "This field is required",
        (v: string) =>
            /^[^.][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{1,63}\.[a-zA-Z]{2,63}$/.test(v) ||
            "Please enter a valid email",
    ],
    password: [
        (v: string) => !!v || "This field is required",
        (v: string) =>
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?#&]{8,}$/.test(v) ||
            "Password must be at least 8 characters long and include at least one letter and one number",
    ],
    passwordShort: [
        (v: string) => !!v || "This field is required",
        (v: string) =>
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?#&]{8,}$/.test(v) ||
            "Min 8 characters, must include one letter & number"
    ],
    required: [
        (v: string) => !!v || "This field is required",
        (v: string) => v.length != 0 || "This field is required",
        (v: string) => /^\s*\S.*/.test(v) || "This field is required"
    ],
    max30: [(v) => /^.{1,30}$/.test(v) || "Must be less than 30 characters"],
    max50: [(v) => /^.{0,49}$/.test(v) || "Must be less than 50 characters"],
    max60: [(v) => /^.{1,60}$/.test(v) || "Must be less than 60 characters"],
    max100: [(v) => /^.{0,99}$/.test(v) || "Must be less than 100 characters"],
    max255: [(v) => /^.{0,254}$/.test(v) || "Must be less than 255 characters"],
    specialCharactersWithoutUnderscore: [
        (v) => /^[a-zA-Z0-9\s]*$/.test(v) || "Special characters are not allowed!"
    ],
    alphabetWithUnderscore: [
        (v) => /^[a-z0-9_]+$/.test(v) || "Capital letters & special characters not allowed!"
    ],
    emojiRegex: [
        (v) =>
            !new RegExp(/(?:\p{Extended_Pictographic}|\p{Regional_Indicator})/u).test(v) ||
            "Emojis are not allowed!"
    ],
}

export default ValidationRules;