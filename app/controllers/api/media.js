import Debug from 'debug';
import CoreController from './CoreController.js';
import mediaDataMapper from '../../models/mediaDataMapper.js';

const debug = Debug('pepine:controllers:media');

/** Class representing a media controller. */
class MediaController extends CoreController {
  static dataMapper = mediaDataMapper;

  // table name in postgresql
  static dataNames = 'media';

  /**
   * create a media controller
  *
  * @augments CoreController
  */
  constructor() {
    super();

    debug('media controller created');
  }
}

export default new MediaController();
