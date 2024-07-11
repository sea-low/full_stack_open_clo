class Promise {
    private result
    constructor(callback) {
        // constructor runs when the class is instantiated
        // instantiation is when you call new in front of class
        // aka when class is born
        // not a member function; just a parameter
        callback(this.resolve, this.reject)
    }
    // resolve only accessible in class
    // private vs public tells us if it's accessible inside or outside of class
    private resolve(result) {
        this.result = result
        return new Promise(result)
        // these are 'member functions/methods; things that are top level of class
        // also member variables good luck Clo
        // you are returning a new instance of yourself
    }
    private reject(errorResult) {
        this.result = errorResult
        return new Promise(errorResult)
    }
    public then(callback) {
        return callback(this.result)
    }
}