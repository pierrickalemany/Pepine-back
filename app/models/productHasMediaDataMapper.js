import Debug from 'debug';
import CoreDataMapper from './CoreDataMapper.js';

const debug = Debug('pepine:DataMapper:product_has_media');

// Create a product_has_media data mapper
class ProductHasMediaDataMapper extends CoreDataMapper {
  static tableName = 'product_has_media';

  // insertfunction created in postgresql
  static insertFunc = 'create_product_has_media';

  /**
   * create a product_has_media data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('product_has_media data mapper created');
  }
}

export default new ProductHasMediaDataMapper();
