export class TypingMap {
  private readonly map: Map<string, readonly string[]>
  private readonly sokuonSet: Set<string>
  private readonly availableSet: Set<string>

  public constructor() {
    this.map = new Map()
    // SIGN
    this.map.set('-', ['ー'])
    this.map.set(',', ['、'])
    this.map.set('.', ['。'])
    this.map.set('/', ['・'])
    // NUMERIC
    this.map.set('0', ['０'])
    this.map.set('1', ['１'])
    this.map.set('2', ['２'])
    this.map.set('3', ['３'])
    this.map.set('4', ['４'])
    this.map.set('5', ['５'])
    this.map.set('6', ['６'])
    this.map.set('7', ['７'])
    this.map.set('8', ['８'])
    this.map.set('9', ['９'])
    // VOWEL
    this.map.set('a', ['あ'])
    this.map.set('i', ['い'])
    this.map.set('u', ['う'])
    this.map.set('e', ['え'])
    this.map.set('o', ['お'])
    // b
    this.map.set('ba', ['ば'])
    this.map.set('bi', ['び'])
    this.map.set('bu', ['ぶ'])
    this.map.set('be', ['べ'])
    this.map.set('bo', ['ぼ'])
    // c
    this.map.set('ca', ['か'])
    this.map.set('ci', ['し'])
    this.map.set('cu', ['く'])
    this.map.set('ce', ['せ'])
    this.map.set('co', ['こ'])
    // d
    this.map.set('da', ['だ'])
    this.map.set('di', ['ぢ'])
    this.map.set('du', ['づ'])
    this.map.set('de', ['で'])
    this.map.set('do', ['ど'])
    // f
    this.map.set('fa', ['ふ', 'ぁ'])
    this.map.set('fi', ['ふ', 'ぃ'])
    this.map.set('fu', ['ふ'])
    this.map.set('fe', ['ふ', 'ぇ'])
    this.map.set('fo', ['ふ', 'ぉ'])
    // g
    this.map.set('ga', ['が'])
    this.map.set('gi', ['ぎ'])
    this.map.set('gu', ['ぐ'])
    this.map.set('ge', ['げ'])
    this.map.set('go', ['ご'])
    // h
    this.map.set('ha', ['は'])
    this.map.set('hi', ['ひ'])
    this.map.set('hu', ['ふ'])
    this.map.set('he', ['へ'])
    this.map.set('ho', ['ほ'])
    // j
    this.map.set('ja', ['じ', 'ゃ'])
    this.map.set('ji', ['じ'])
    this.map.set('ju', ['じ', 'ゅ'])
    this.map.set('je', ['じ', 'ぇ'])
    this.map.set('jo', ['じ', 'ょ'])
    // k
    this.map.set('ka', ['か'])
    this.map.set('ki', ['き'])
    this.map.set('ku', ['く'])
    this.map.set('ke', ['け'])
    this.map.set('ko', ['こ'])
    // l
    this.map.set('la', ['ぁ'])
    this.map.set('li', ['ぃ'])
    this.map.set('lu', ['ぅ'])
    this.map.set('le', ['ぇ'])
    this.map.set('lo', ['ぉ'])
    // m
    this.map.set('ma', ['ま'])
    this.map.set('mi', ['み'])
    this.map.set('mu', ['む'])
    this.map.set('me', ['め'])
    this.map.set('mo', ['も'])
    // n
    this.map.set('na', ['な'])
    this.map.set('ni', ['に'])
    this.map.set('nu', ['ぬ'])
    this.map.set('ne', ['ね'])
    this.map.set('no', ['の'])
    // p
    this.map.set('pa', ['ぱ'])
    this.map.set('pi', ['ぴ'])
    this.map.set('pu', ['ぷ'])
    this.map.set('pe', ['ぺ'])
    this.map.set('po', ['ぽ'])
    // q
    this.map.set('qa', ['く', 'ぁ'])
    this.map.set('qi', ['く', 'ぃ'])
    this.map.set('qu', ['く'])
    this.map.set('qe', ['く', 'ぇ'])
    this.map.set('qo', ['く', 'ぉ'])
    // r
    this.map.set('ra', ['ら'])
    this.map.set('ri', ['り'])
    this.map.set('ru', ['る'])
    this.map.set('re', ['れ'])
    this.map.set('ro', ['ろ'])
    // s
    this.map.set('sa', ['さ'])
    this.map.set('si', ['し'])
    this.map.set('su', ['す'])
    this.map.set('se', ['せ'])
    this.map.set('so', ['そ'])
    // t
    this.map.set('ta', ['た'])
    this.map.set('ti', ['ち'])
    this.map.set('tu', ['つ'])
    this.map.set('te', ['て'])
    this.map.set('to', ['と'])
    // v
    this.map.set('va', ['ヴ', 'ぁ'])
    this.map.set('vi', ['ヴ', 'ぃ'])
    this.map.set('vu', ['ヴ'])
    this.map.set('ve', ['ヴ', 'ぇ'])
    this.map.set('vo', ['ヴ', 'ぉ'])
    // w
    this.map.set('wa', ['わ'])
    this.map.set('wi', ['う', 'ぃ'])
    this.map.set('wu', ['う'])
    this.map.set('we', ['う', 'ぇ'])
    this.map.set('wo', ['を'])
    // x
    this.map.set('xa', ['ぁ'])
    this.map.set('xi', ['ぃ'])
    this.map.set('xu', ['ぅ'])
    this.map.set('xe', ['ぇ'])
    this.map.set('xo', ['ぉ'])
    // y
    this.map.set('ya', ['や'])
    this.map.set('yi', ['い'])
    this.map.set('yu', ['ゆ'])
    this.map.set('ye', ['い', 'ぇ'])
    this.map.set('yo', ['よ'])
    // z
    this.map.set('za', ['ざ'])
    this.map.set('zi', ['じ'])
    this.map.set('zu', ['ず'])
    this.map.set('ze', ['ぜ'])
    this.map.set('zo', ['ぞ'])
    // by
    this.map.set('bya', ['び', 'ゃ'])
    this.map.set('byi', ['び', 'ぃ'])
    this.map.set('byu', ['び', 'ゅ'])
    this.map.set('bye', ['び', 'ぇ'])
    this.map.set('byo', ['び', 'ょ'])
    // cy
    this.map.set('cya', ['ち', 'ゃ'])
    this.map.set('cyi', ['ち', 'ぃ'])
    this.map.set('cyu', ['ち', 'ゅ'])
    this.map.set('cye', ['ち', 'ぇ'])
    this.map.set('cyo', ['ち', 'ょ'])
    // dy
    this.map.set('dya', ['ぢ', 'ゃ'])
    this.map.set('dyi', ['ぢ', 'ぃ'])
    this.map.set('dyu', ['ぢ', 'ゅ'])
    this.map.set('dye', ['ぢ', 'ぇ'])
    this.map.set('dyo', ['ぢ', 'ょ'])
    // fy
    this.map.set('fya', ['ふ', 'ゃ'])
    this.map.set('fyi', ['ふ', 'ぃ'])
    this.map.set('fyu', ['ふ', 'ゅ'])
    this.map.set('fye', ['ふ', 'ぇ'])
    this.map.set('fyo', ['ふ', 'ょ'])
    // gy
    this.map.set('gya', ['ぎ', 'ゃ'])
    this.map.set('gyi', ['ぎ', 'ぃ'])
    this.map.set('gyu', ['ぎ', 'ゅ'])
    this.map.set('gye', ['ぎ', 'ぇ'])
    this.map.set('gyo', ['ぎ', 'ょ'])
    // hy
    this.map.set('hya', ['ひ', 'ゃ'])
    this.map.set('hyi', ['ひ', 'ぃ'])
    this.map.set('hyu', ['ひ', 'ゅ'])
    this.map.set('hye', ['ひ', 'ぇ'])
    this.map.set('hyo', ['ひ', 'ょ'])
    // jy
    this.map.set('jya', ['じ', 'ゃ'])
    this.map.set('jyi', ['じ', 'ぃ'])
    this.map.set('jyu', ['じ', 'ゅ'])
    this.map.set('jye', ['じ', 'ぇ'])
    this.map.set('jyo', ['じ', 'ょ'])
    // ky
    this.map.set('kya', ['き', 'ゃ'])
    this.map.set('kyi', ['き', 'ぃ'])
    this.map.set('kyu', ['き', 'ゅ'])
    this.map.set('kye', ['き', 'ぇ'])
    this.map.set('kyo', ['き', 'ょ'])
    // ly
    this.map.set('lya', ['ゃ'])
    this.map.set('lyi', ['ぃ'])
    this.map.set('lyu', ['ゅ'])
    this.map.set('lye', ['ぇ'])
    this.map.set('lyo', ['ょ'])
    // my
    this.map.set('mya', ['み', 'ゃ'])
    this.map.set('myi', ['み', 'ぃ'])
    this.map.set('myu', ['み', 'ゅ'])
    this.map.set('mye', ['み', 'ぇ'])
    this.map.set('myo', ['み', 'ょ'])
    // ny
    this.map.set('nya', ['に', 'ゃ'])
    this.map.set('nyi', ['に', 'ぃ'])
    this.map.set('nyu', ['に', 'ゅ'])
    this.map.set('nye', ['に', 'ぇ'])
    this.map.set('nyo', ['に', 'ょ'])
    // py
    this.map.set('pya', ['ぴ', 'ゃ'])
    this.map.set('pyi', ['ぴ', 'ぃ'])
    this.map.set('pyu', ['ぴ', 'ゅ'])
    this.map.set('pye', ['ぴ', 'ぇ'])
    this.map.set('pyo', ['ぴ', 'ょ'])
    // qy
    this.map.set('qya', ['く', 'ゃ'])
    this.map.set('qyi', ['く', 'ぃ'])
    this.map.set('qyu', ['く', 'ゅ'])
    this.map.set('qye', ['く', 'ぇ'])
    this.map.set('qyo', ['く', 'ょ'])
    // ry
    this.map.set('rya', ['り', 'ゃ'])
    this.map.set('ryi', ['り', 'ぃ'])
    this.map.set('ryu', ['り', 'ゅ'])
    this.map.set('rye', ['り', 'ぇ'])
    this.map.set('ryo', ['り', 'ょ'])
    // sy
    this.map.set('sya', ['し', 'ゃ'])
    this.map.set('syi', ['し', 'ぃ'])
    this.map.set('syu', ['し', 'ゅ'])
    this.map.set('sye', ['し', 'ぇ'])
    this.map.set('syo', ['し', 'ょ'])
    // ty
    this.map.set('tya', ['ち', 'ゃ'])
    this.map.set('tyi', ['ち', 'ぃ'])
    this.map.set('tyu', ['ち', 'ゅ'])
    this.map.set('tye', ['ち', 'ぇ'])
    this.map.set('tyo', ['ち', 'ょ'])
    // vy
    this.map.set('vya', ['ヴ', 'ゃ'])
    this.map.set('vyi', ['ヴ', 'ぃ'])
    this.map.set('vyu', ['ヴ', 'ゅ'])
    this.map.set('vye', ['ヴ', 'ぇ'])
    this.map.set('vyo', ['ヴ', 'ょ'])
    // wy
    this.map.set('wyi', ['ゐ'])
    this.map.set('wye', ['ゑ'])
    // xy
    this.map.set('xya', ['ゃ'])
    this.map.set('xyi', ['ぃ'])
    this.map.set('xyu', ['ゅ'])
    this.map.set('xye', ['ぇ'])
    this.map.set('xyo', ['ょ'])
    // zy
    this.map.set('zya', ['じ', 'ゃ'])
    this.map.set('zyi', ['じ', 'ぃ'])
    this.map.set('zyu', ['じ', 'ゅ'])
    this.map.set('zye', ['じ', 'ぇ'])
    this.map.set('zyo', ['じ', 'ょ'])
    // ch
    this.map.set('cha', ['ち', 'ゃ'])
    this.map.set('chi', ['ち'])
    this.map.set('chu', ['ち', 'ゅ'])
    this.map.set('che', ['ち', 'ぇ'])
    this.map.set('cho', ['ち', 'ょ'])
    // ts
    this.map.set('tsa', ['つ', 'ぁ'])
    this.map.set('tsi', ['つ', 'ぃ'])
    this.map.set('tsu', ['つ'])
    this.map.set('tse', ['つ', 'ぇ'])
    this.map.set('tso', ['つ', 'ぉ'])
    // SOKUON
    this.map.set('ltu', ['っ'])
    // HATSUON
    this.map.set('nn', ['ん'])

    this.sokuonSet = new Set()
    this.sokuonSet.add('bb')
    this.sokuonSet.add('cc')
    this.sokuonSet.add('dd')
    this.sokuonSet.add('ff')
    this.sokuonSet.add('gg')
    this.sokuonSet.add('hh')
    this.sokuonSet.add('jj')
    this.sokuonSet.add('kk')
    this.sokuonSet.add('ll')
    this.sokuonSet.add('mm')
    this.sokuonSet.add('pp')
    this.sokuonSet.add('qq')
    this.sokuonSet.add('rr')
    this.sokuonSet.add('ss')
    this.sokuonSet.add('tt')
    this.sokuonSet.add('vv')
    this.sokuonSet.add('ww')
    this.sokuonSet.add('xx')
    this.sokuonSet.add('yy')
    this.sokuonSet.add('zz')

    this.availableSet = new Set()
    this.availableSet.add('a')
    this.availableSet.add('b')
    this.availableSet.add('c')
    this.availableSet.add('d')
    this.availableSet.add('e')
    this.availableSet.add('f')
    this.availableSet.add('g')
    this.availableSet.add('h')
    this.availableSet.add('i')
    this.availableSet.add('j')
    this.availableSet.add('k')
    this.availableSet.add('l')
    this.availableSet.add('m')
    this.availableSet.add('n')
    this.availableSet.add('o')
    this.availableSet.add('p')
    this.availableSet.add('q')
    this.availableSet.add('r')
    this.availableSet.add('s')
    this.availableSet.add('t')
    this.availableSet.add('u')
    this.availableSet.add('v')
    this.availableSet.add('w')
    this.availableSet.add('x')
    this.availableSet.add('y')
    this.availableSet.add('z')
    this.availableSet.add('0')
    this.availableSet.add('1')
    this.availableSet.add('2')
    this.availableSet.add('3')
    this.availableSet.add('4')
    this.availableSet.add('5')
    this.availableSet.add('6')
    this.availableSet.add('7')
    this.availableSet.add('8')
    this.availableSet.add('9')
    this.availableSet.add('-')
    this.availableSet.add(',')
    this.availableSet.add('.')
    this.availableSet.add('/')
  }

  public isAvailable(c: string): boolean {
    return this.availableSet.has(c)
  }

  public convert(pending: string): [readonly string[], string | null] {
    for (let count = 0; count < 3; ++count) {
      const i = 3 - count
      if (i > pending.length) {
        continue
      }
      const s = pending.slice(-i)
      // check sokuon
      if (this.sokuonSet.has(s)) {
        const f = pending.slice(0, pending.length - i).split('')
        f.push('っ')
        return [f, s[0]]
      }
      // otherwise
      const r = this.map.get(s)
      if (r !== undefined) {
        const f = pending.slice(0, pending.length - i).split('')
        const a = f.concat(r)
        return [a, null]
      }
    }
    return [[], null]
  }
}
