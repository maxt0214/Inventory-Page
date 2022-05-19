class IdGenerator {
  //Real simple, should try to encode in deployment
  static GenId(encoder, num) {
    return encoder + num;
  }
}

module.exports = IdGenerator;