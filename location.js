class Link {
    constructor({
      latitude,
      longitude,
      description,
      partition,
      id = new ObjectId(),
    }) {
  
      this._partition = partition;
      this._id = id;
      this.latitude = latitude;
      this.longitude = longitude;
      this.description = description
    }
  
    static schema = {
      name: 'Location',
      properties: {
        _id: 'objectId',
        _partition: 'string',
        latitude: 'string',
        longitude: 'string',
        description : 'string'
      },
  
      primaryKey: '_id',
    };
  }