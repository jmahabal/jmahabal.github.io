import validation from './validation';

// FIXME: combine into one test sequence
it('should satisfy the password criteria', () => {
    expect(validation("hello")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation("he11o")).toBe(true);
});
it('should satisfy the password criteria', () => {
    expect(validation("12312")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation("!@#$%^&*")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation("")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation(" ")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation("./;asdf;ajSDAS;!jnszd  saaSDdk!@#lfa")).toBe(false);
});
it('should satisfy the password criteria', () => {
    expect(validation("./;asdf;ajSDAS;!jnsz0d  saaSDdk!@#lfa")).toBe(true);
});
