import Debug from 'debug';
import CoreController from './CoreController.js';
import mediaDataMapper from '../../models/mediaDataMapper.js';

const debug = Debug('pepine:controllers:media');

/** Class representing a media controller. */
/**
 * Controller for handling media-related requests.
 * @class
 * @augments CoreController
 */
class MediaController extends CoreController {
  /**
   * The data mapper for media objects.
   * @type {Object}
   * @memberof MediaController
   * @static
   */
  static dataMapper = mediaDataMapper;

  /**
   * The name of the table in the PostgreSQL database.
   * @type {string}
   * @memberof MediaController
   * @static
   */
  static dataNames = 'media';

  /**
   * Creates a new instance of the MediaController class.
   * @memberof MediaController
   * @constructor
   */
  constructor() {
    super();

    debug('media controller created');
  }
}

export default new MediaController();
