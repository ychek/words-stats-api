'use stric';


class PerformanceLogger {

    constructor(input) {
        this.startTime = process.hrtime();
        this.input = input
    }

    static getTime() {

        return new Date().toLocaleString();
    }

    calcElapsedTimeInSeconds() {

        return process.hrtime(this.startTime)[0];
    }

    calcElapsedTimeInMilliseconds() {

        return (process.hrtime(this.startTime)[1] / 1000000000).toFixed(5);
    }

    printChunksStatus(chunkCount, interval=1000000) {

        if (chunkCount % interval === 0 ) {

            this.printWorkInProcess()

        }

    }

    printBeginProcessingRemote() {

        console.log(`${PerformanceLogger.getTime()}: Beginning to count words in remote file (${this.input}) ...`);

    }

    printBeginProcessingLocal() {

        console.log(`${PerformanceLogger.getTime()}: Beginning to count words in local file (${this.input}) ...`);

    }

    printWorkInProcess() {
        console.log(`${PerformanceLogger.getTime()}: Be patient ;) the counting of the words for the file (${this.input}) is still in progress...`);
    }

    printRemoteFileProcessingTime() {

        console.log(`${PerformanceLogger.getTime()}: Finished counting words in remote file (${this.input}) in ${this.calcElapsedTimeInSeconds()} second(s)`);

    }

    printLocalFileCountingTime() {

        console.log(`${PerformanceLogger.getTime()}: Finished counting words in local file (${this.input}) in ${this.calcElapsedTimeInSeconds()} second(s)`);

    }

    printStringInputCountingTime() {

        console.log(`${PerformanceLogger.getTime()}: Finished counting words for the given string (${this.input}) in ${this.calcElapsedTimeInMilliseconds()} second(s)`);

    }

    printWordLookupTime() {

        console.log(`${PerformanceLogger.getTime()}: Lookup time for word: "${this.input}" in ${this.calcElapsedTimeInMilliseconds()} millisecond(s)`);

    }

}


module.exports = { PerformanceLogger };