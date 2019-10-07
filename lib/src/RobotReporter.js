/*
  @param instructions format ...
  @return {} ...
*/
class RobotReporter {
  constructor () {
    this.reports = []
  }

  add (log) {
    this.reports.push(log)
  }

  get (separator) {
    return this.reports.join(separator)
  }
}

module.exports = RobotReporter
