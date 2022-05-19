let instance = undefined;

export default class MessageQueue {
  static Instance() {
    if(instance === undefined)
      instance = new MessageQueue();
    return instance;
  }
  //Do not call constructor
  constructor() {
    this.subscribers = new Map();
  }

  Subscribe(message, callback) {
    console.log(`MessageQueue: Subscriber ${callback.constructor.name} Subscribed Message ${message}`);
    this.subscribers.set(message, callback);
  }

  FireMessage(message, context) {
    let callback = this.subscribers.get(message);
    console.log(`MessageQueue: Fired Message ${callback.constructor.name} Context:${JSON.stringify(context)}`);
    if(callback !== undefined) callback.update(message,context);
  }
}