export class ForgotPassword {
    constructor(public username: string) {}
    toJSON() {
        return {username: this.username};
    }
}
