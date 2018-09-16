import { compose } from './compose';

describe('compose', () => {
    it('composes functions', () => {
        const f1 = (x) => x + 1;
        
        const f2 = compose([f1, f1]);

        expect(f2(1)).toBe(3);
    });

    it('applies first function first', () => {
        const f1 = (x) => x * 0;
        const f2 = (x) => x + 1;

        const f3 = compose([f1, f2]);

        expect(f3(100)).toBe(1);
    });
});
