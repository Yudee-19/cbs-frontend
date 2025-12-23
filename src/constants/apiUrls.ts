const build = (...parts: string[]) =>
  ['api', ...parts]
    .map((p) => (p || '').replace(/^\/+|\/+$/g, '')) // Safe replace with fallback
    .filter(Boolean)
    .join('/');

export const API_URLS = {
    ASSETS:{
    EQUIPMENT: build('equipment'),
    FURNITURES: build('furnitures'),
    VEHICLES: build('vehicles'),
    PROPERTIES: build('properties'),
    },
    COMPANY_DOCUMENTS:{
      ADUIT: build('audits'),
      ISO: build('iso'),
      LICENSES: build('licenses'),
      LEGAL_DOCS: build('documents'),
    },
    IT:{
    HARDWARE: build('hardware'),
    HARDWARE_TRANSFER: build('hardware-transfer'),
    NETWORK_EQUIPMENTS: build('network-equipment'),
    SIM: build('sim'),
    SOFTWARE_LICENSES: build('software'),
    SUPPORT: build('support'),
    },
    FILE_UPLOAD: build('file-upload'),
    LEAVEAPPLICATION: build('leave-application'),

 
} as const;

export type ApiUrlMap = typeof API_URLS;
