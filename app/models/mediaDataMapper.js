import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:media');

// Create a media data mapper
/**
 * A class representing a media data mapper.
 * @extends CoreDataMapper
 */
class MediaDataMapper extends CoreDataMapper {
  /**
   * The name of the table in the database.
   * @type {string}
   */
  static tableName = 'media';

  /**
   * The name of the insert function created in PostgreSQL.
   * @type {string}
   */
  static insertFunc = 'create_media';

  /**
   * The name of the update function created in PostgreSQL.
   * @type {string}
   */
  static updateFunc = 'update_media';

  /**
   * Creates a new instance of the MediaDataMapper class.
  */
  constructor() {
    super();
    debug('media data mapper created');
  }
}

export default new MediaDataMapper();
