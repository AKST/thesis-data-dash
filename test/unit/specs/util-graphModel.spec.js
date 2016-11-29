import { Range, RangeFactory } from 'src/util/graph-model'

describe('util.graph-model', () => {
  describe('Range', () => {
    it('default name is empty string', () => {
      expect(new Range().description).to.equal('')
    })

    it('first argument is description', () => {
      const arg = 'asdfasdfs'
      expect(new Range(arg).description).to.equal(arg)
    })

    describe('[1, 2, 3, 4]', () => {
      const r = new Range()
      r.adjust(1)
      r.adjust(2)
      r.adjust(3)
      r.adjust(4)

      it('should have min 1', () => expect(r.min).to.equal(1))
      it('should have max 4', () => expect(r.max).to.equal(4))
      it('should have difference 3', () => expect(r.difference).to.equal(3))
    })
  })

  describe('RangeFactory', () => {
    describe('constructor', () => {
      it('should require description', () => {
        expect(() => new RangeFactory()).to.throw(Error)
      })
    })

    describe('instance', () => {
      it('should produce a range with matching description', () => {
        const factor = new RangeFactory('ayy lmao')
        expect(factor.init().description).to.equal(factor.description)
      })
    })
  })
})
