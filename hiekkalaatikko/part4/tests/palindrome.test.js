const palindrome = require('../utils/for_testing').palindrome
describe('palindrome', () => {
    test('of a', () => {
        const result = palindrome('a')
        expect(result).toBe('a')
    })
    
    test('of react', () => {
        const result = palindrome('react')
        expect(result).toBe('tcaer')
    })
    
    test('of saippuakauppias', () => {
        const result = palindrome('saippuakauppias')
        expect(result).toBe('saippuakauppias')
    })
})

const average = require('../utils/for_testing').average
describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of many is calculated right', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})