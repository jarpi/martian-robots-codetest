/*
  @param instructions format ...
  @return {} ...
*/
class RobotReporterService {
  constructor () {
    this.reports = []
  }

  add (log) {
    this.reports.push(log)
  }

  format (separator) {
    return this.reports.join(separator)
  }
}

module.exports = RobotReporterService
