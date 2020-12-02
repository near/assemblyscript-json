import { JSON } from '..';

describe('Escaped characters', () => {
  it('Does not escape characters unneccessarily', () => {
    const strings = [
      'sphinx of black quartz, judge my vow',
      '{}',
      '[]',
      '/',
      '|',
      '/|||/|||[{]}<>,.',
      'ஂ ஃ அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஜ ஞ ட ண த ந ன ப ம ய ர ற ல ள',
      'ᄀ ᄁ ᄂ ᄃ ᄄ ᄅ ᄆ ᄇ ᄈ ᄉ ᄊ ᄋ ᄌ ᄍ ᄎ ᄏ ᄐ ᄑ ᄒ ᄓ ᄔ ᄕ ᄖ ᄗ ᄘ ᄙ ᄚ ᄛ ',
      '℀ ℁ ℂ ℃ ℄ ℅ ℆ ℇ ℈ ℉ ℊ ℋ ℌ ℍ ℎ ℏ ℐ ℑ ℒ ℓ ℔ ℕ № ℗ ℘ ℙ ℚ ℛ ℜ ℝ ℞ ℟ ℠ ℡ ™ ℣ ℤ ℥ Ω ℧ ℨ ℩ K Å ℬ ℭ ℮ ℯ ℰ ℱ Ⅎ ℳ ℴ ℵ ℶ ℷ ℸ ',
      '☀ ☁ ☂ ☃ ☄ ★ ☆ ☇ ☈ ☉ ☊ ☋ ☌ ☍ ☎ ☏ ☐ ☑ ☒ ☓ ☚ ☛ ☜ ☝ ☞ ☟ ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☮ ☯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ☸ ☹ ☺ ☻ ☼ ☽ ☾ ☿ ♀ ♁ ♂ ♃ ♄ ♅ ♆ ♇ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓',
    ];
    strings.forEach((str) => {
      const jsonStr = new JSON.Str(str);
      expect(jsonStr.toString()).toBe('"' + str + '"');
    });
  });
  it('Escapes quotes and backslashes', () => {
    const strings = ['"', '\\', '"\\"', '\\"\\"'];
    strings.forEach((str) => {
      const jsonStr = new JSON.Str(str);
      expect(jsonStr.toString()).toBe('"' + escaped(str) + '"');
    });
  });
  it('Escapes control characters', () => {
    const strings = ['\n', '\r', '\r\n', '\b', '\f', '\t', '\v', '\b\f\t\v\r'];
    strings.forEach((str) => {
      const jsonStr = new JSON.Str(str);
      expect(jsonStr.toString()).toBe('"' + escaped(str) + '"');
    });
  });
});

function escaped(str: string): string {
  const escapedChars: i32[] = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (
      charCode < 0x20 || // control characters
      charCode == 0x22 || // double quote (")
      charCode == 0x5c
    ) {
      // backslash / reverse solidus (\)
      escapedChars.push(0x5c);
    }
    escapedChars.push(charCode);
  }
  return String.fromCharCodes(escapedChars);
}
