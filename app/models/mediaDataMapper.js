import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:media');

// Create a media data mapper
class MediaDataMapper extends CoreDataMapper {
  static tableName = 'media';

  static insertFunc = 'create_media';

  static updateFunc = 'update_media';

  /**
   * create a media data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('media data mapper created');
  }
}

export default new MediaDataMapper();
