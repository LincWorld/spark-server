// @flow

import type { Container } from 'constitute';

import { defaultBindings } from 'spark-protocol';
import { Transient } from 'constitute';
import DeviceClaimsController from './controllers/DeviceClaimsController';
import DevicesController from './controllers/DevicesController';
import EventsController from './controllers/EventsController';
import OauthClientsController from './controllers/OauthClientsController';
import ProductsController from './controllers/ProductsController';
import ProvisioningController from './controllers/ProvisioningController';
import UsersController from './controllers/UsersController';
import WebhooksController from './controllers/WebhooksController';
import WebhookManager from './managers/WebhookManager';
import EventManager from './managers/EventManager';
import DeviceFirmwareFileRepository from './repository/DeviceFirmwareFileRepository';
import DeviceManager from './managers/DeviceManager';
import UserFileRepository from './repository/UserFileRepository';
import WebhookFileRepository from './repository/WebhookFileRepository';
import settings from './settings';

export default (container: Container) => {
  // spark protocol container bindings
  defaultBindings(container);

  // settings
  container.bindValue('DEVICE_DIRECTORY', settings.DEVICE_DIRECTORY);
  container.bindValue('FIRMWARE_DIRECTORY', settings.FIRMWARE_DIRECTORY);
  container.bindValue('SERVER_KEY_FILENAME', settings.SERVER_KEY_FILENAME);
  container.bindValue('SERVER_KEYS_DIRECTORY', settings.SERVER_KEYS_DIRECTORY);
  container.bindValue('USERS_DIRECTORY', settings.USERS_DIRECTORY);
  container.bindValue('WEBHOOKS_DIRECTORY', settings.WEBHOOKS_DIRECTORY);

  // controllers
  container.bindClass(
    'DeviceClaimsController',
    DeviceClaimsController,
    Transient.with([
      'DeviceManager',
      'ClaimCodeManager',
    ]),
  );
  container.bindClass(
    'DevicesController',
    DevicesController,
    Transient.with(['DeviceManager']),
  );
  container.bindClass(
    'EventsController',
    EventsController,
    Transient.with(['EventManager']),
  );
  container.bindClass(
    'OauthClientsController',
    OauthClientsController,
    Transient.with([]),
  );
  container.bindClass(
    'ProductsController',
    ProductsController,
    Transient.with([]),
  );
  container.bindClass(
    'ProvisioningController',
    ProvisioningController,
    Transient.with(['DeviceManager']),
  );
  container.bindClass(
    'UsersController',
    UsersController,
    Transient.with(['UserRepository']),
  );
  container.bindClass(
    'WebhooksController',
    WebhooksController,
    Transient.with(['WebhookManager']),
  );

  // managers
  container.bindClass(
    'DeviceManager',
    DeviceManager,
    [
      'DeviceAttributeRepository',
      'DeviceFirmwareRepository',
      'DeviceKeyRepository',
      'DeviceServer',
    ],
  );
  container.bindClass(
    'EventManager',
    EventManager,
    ['EventPublisher'],
  );
  container.bindClass(
    'WebhookManager',
    WebhookManager,
    ['WebhookRepository', 'EventPublisher'],
  );

  // Repositories
  container.bindClass(
    'DeviceFirmwareRepository',
    DeviceFirmwareFileRepository,
    ['FIRMWARE_DIRECTORY'],
  );
  container.bindClass(
    'UserRepository',
    UserFileRepository,
    ['USERS_DIRECTORY'],
  );
  container.bindClass(
    'WebhookRepository',
    WebhookFileRepository,
    ['WEBHOOKS_DIRECTORY'],
  );
};
