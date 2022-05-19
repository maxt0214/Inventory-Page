class InputValidator {
  static ValidName(name) {
    return typeof name === 'string' && name.length > 10;
  }

  static ValidItemName(item) {
    return typeof item === 'string' && item.length > 0;
  }

  static ValidStock(stock) {
    return typeof stock === 'number' && stock >= 0;
  }
}

module.exports = InputValidator;