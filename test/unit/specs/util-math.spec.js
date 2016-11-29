import { round, commaSeperate } from 'src/util/math'

describe('util.math', () => {
  describe('round(2)', () => {
    it('should round 2.222 to 2.22', () => {
      expect(round(2.222, 2)).to.equal(2.22)
    })

    it('should round 0 to 0', () => {
      expect(round(0, 2)).to.equal(0)
    })
  })

  describe('commaSeperate', () => {
    it('should transform 1234 into 1,234', () => {
      expect(commaSeperate(1234)).to.equal('1,234')
    })
  })
})
