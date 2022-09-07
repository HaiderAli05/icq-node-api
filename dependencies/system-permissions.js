// exporting permissions as module
module.exports = {

  // ADMIN PERMISSIONS
  ADMIN_MASTER_FRANCHISE: [`admin:master-franchise`],
  ADMIN_FRANCHISE: [`admin:franchise`],
  // ADMIN_LOCATION: [`admin:location`],

  // ASSETS PERMISSIONS
  ASSETS_CREATE: [`assets:*`, `assets:create`],
  ASSETS_READ: [`assets:*`, `assets:read`, `assets:create`, `assets:update`, `assets:delete`],
  ASSETS_UPDATE: [`assets:*`, `assets:update`],
  ASSETS_DELETE: [`assets:*`, `assets:delete`],

  // BROADCASTS PERMISSIONS
  BROADCASTS_CREATE: [`broadcasts:*`, `broadcasts:create`],
  BROADCASTS_READ: [`broadcasts:*`, `broadcasts:read`, `broadcasts:create`, `broadcasts:update`, `broadcasts:delete`],
  BROADCASTS_UPDATE: [`broadcasts:*`, `broadcasts:update`],
  BROADCASTS_DELETE: [`broadcasts:*`, `broadcasts:delete`],

  // CARRIERS PERMISSIONS
  CARRIERS_CREATE: [`carriers:*`, `carriers:create`],
  CARRIERS_READ: [`carriers:*`, `carriers:read`, `carriers:create`, `carriers:update`, `carriers:delete`],
  CARRIERS_UPDATE: [`carriers:*`, `carriers:update`],
  CARRIERS_DELETE: [`carriers:*`, `carriers:delete`],

  // CLOUDINARY PERMISSIONS
  CLOUDINARY_CREATE: [`cloudinary:*`, `cloudinary:create`],
  CLOUDINARY_READ: [`cloudinary:*`, `cloudinary:read`, `cloudinary:create`, `cloudinary:update`, `cloudinary:delete`],
  CLOUDINARY_UPDATE: [`cloudinary:*`, `cloudinary:update`],
  CLOUDINARY_DELETE: [`cloudinary:*`, `cloudinary:delete`],

  // CONTACTS PERMISSIONS
  CONTACTS_CREATE: [`contacts:*`, `contacts:create`],
  CONTACTS_READ: [`contacts:*`, `contacts:read`, `contacts:create`, `contacts:update`, `contacts:delete`],
  CONTACTS_UPDATE: [`contacts:*`, `contacts:update`],
  CONTACTS_DELETE: [`contacts:*`, `contacts:delete`],

  // CUSTOMERS PERMISSIONS
  CUSTOMERS_CREATE: [`customers:*`, `customers:create`],
  CUSTOMERS_READ: [`customers:*`, `customers:read`, `customers:create`, `customers:update`, `customers:delete`],
  CUSTOMERS_UPDATE: [`customers:*`, `customers:update`],
  CUSTOMERS_DELETE: [`customers:*`, `customers:delete`],

  // CLAIMS PERMISSIONS
  CLAIMS_CREATE: [`claims:*`, `claims:create`],
  CLAIMS_READ: [`claims:*`, `claims:read`, `claims:create`, `claims:update`, `claims:delete`],
  CLAIMS_UPDATE: [`claims:*`, `claims:update`],
  CLAIMS_DELETE: [`claims:*`, `claims:delete`],

  // CREDENTIALS PERMISSIONS
  CREDENTIALS_CREATE: [`credentials:*`, `credentials:create`],
  CREDENTIALS_READ: [`credentials:*`, `credentials:read`, `credentials:create`, `credentials:update`, `credentials:delete`],
  CREDENTIALS_UPDATE: [`credentials:*`, `credentials:update`],
  CREDENTIALS_DELETE: [`credentials:*`, `credentials:delete`],

  // FRANCHISES PERMISSIONS
  FRANCHISES_CREATE: [`franchises:*`, `franchises:create`],
  FRANCHISES_READ: [`franchises:*`, `franchises:read`, `franchises:create`, `franchises:update`, `franchises:delete`],
  FRANCHISES_UPDATE: [`franchises:*`, `franchises:update`],
  FRANCHISES_DELETE: [`franchises:*`, `franchises:delete`],

  // GET PERMISSIONS
  GET_CREATE: [`get:*`, `get:create`],
  GET_READ: [`get:*`, `get:read`, `get:create`, `get:update`, `get:delete`],
  // GET_UPDATE: [`get:*`, `get:update`],
  // GET_DELETE: [`get:*`, `get:delete`],
  // GET_DASHTICS: [`get:*`, `get:dashtics`],
  // ZIPCODES_READ: [`zipcodes:read`],
  // CUSTOMER_TYPES_READ: [`customerTypes:read`],
  // BUSINESS_TYPE_READ: [`businessTypes:read`],
  // CAR_TYPES_READ: [`carTypes:read`],
  // LIEN_HOLDER_TYPES_READ: [`lienHolderTypes:read`],
  // LIEN_HOLDER_INTERESTS_READ: [`lienHolderInterests:read`],
  // GARAGING_READ: [`garaging:read`],
  // STATES_READ: [`states:read`],
  // ANTI_THEFT_DEVICE_READ: [`antiTheftDevice:read`],
  // PERFORMANCE_READ: [`performance:read`],
  // VEHICLE_COVERAGES_READ: [`vehicleCoverages:read`],
  // BODY_TYPES_READ: [`bodyTypes:read`],
  // INDUSTRIES_READ: [`industries:read`],
  // DRIVER_APLICATION_RELATIONS_READ: [`driverAplicationRelations:read`],
  // REFERAL_SOURCE_READ: [`referalSource:read`],
  // POLICY_COVERAGES_READ: [`PolicyCoverages:read`],
  // ENDORESMENT_PREMIUMS_READ: [`endoresment-premiums:read`],
  // ENDORESMENT_STATUS_READ: [`endoresment-status:read`],
  // FEE_TYPES_READ: [`fee-types:read`],
  // PAYMENT_METHODS_READ: [`payment-methods:read`],
  // SYSTEM_PERMISSIONS_READ: [`system-permissions:read`],
  // LOBS_CREATE: [`lobs:create`],

  // HEALTHQUOTES PERMISSIONS
  HEALTHQUOTES_CREATE: [`healthquotes:*`, `healthquotes:create`],
  HEALTHQUOTES_READ: [`healthquotes:*`, `healthquotes:read`, `healthquotes:create`, `healthquotes:update`, `healthquotes:delete`],
  HEALTHQUOTES_UPDATE: [`healthquotes:*`, `healthquotes:update`],
  HEALTHQUOTES_DELETE: [`healthquotes:*`, `healthquotes:delete`],

  // INVOICES PERMISSIONS
  INVOICES_CREATE: [`invoices:*`, `invoices:create`],
  INVOICES_READ: [`invoices:*`, `invoices:read`, `invoices:create`, `invoices:update`, `invoices:delete`],
  INVOICES_UPDATE: [`invoices:*`, `invoices:update`],
  INVOICES_DELETE: [`invoices:*`, `invoices:delete`],

  // LOCATIONS PERMISSIONS
  LOCATIONS_CREATE: [`locations:*`, `locations:create`],
  LOCATIONS_READ: [`locations:*`, `locations:read`, `locations:create`, `locations:update`, `locations:delete`],
  LOCATIONS_UPDATE: [`locations:*`, `locations:update`],
  LOCATIONS_DELETE: [`locations:*`, `locations:delete`],

  // NOTIFICATIONS PERMISSIONS
  NOTIFICATIONS_CREATE: [`notifications:*`, `notifications:create`],
  NOTIFICATIONS_READ: [`notifications:*`, `notifications:read`, `notifications:create`, `notifications:update`, `notifications:delete`],
  NOTIFICATIONS_UPDATE: [`notifications:*`, `notifications:update`],
  NOTIFICATIONS_DELETE: [`notifications:*`, `notifications:delete`],

  // PAYMENTS PERMISSIONS
  PAYMENTS_CREATE: [`payments:*`, `payments:create`],
  PAYMENTS_READ: [`payments:*`, `payments:read`, `payments:create`, `payments:update`, `payments:delete`],
  PAYMENTS_UPDATE: [`payments:*`, `payments:update`],
  PAYMENTS_DELETE: [`payments:*`, `payments:delete`],

  // POLICIES PERMISSIONS
  POLICIES_CREATE: [`policies:*`, `policies:create`],
  POLICIES_READ: [`policies:*`, `policies:read`, `policies:create`, `policies:update`, `policies:delete`],
  POLICIES_UPDATE: [`policies:*`, `policies:update`],
  POLICIES_DELETE: [`policies:*`, `policies:delete`],
  POLICIES_PAY: [`policies:*`, `policies:pay`],
  POLICIES_QUERY: [`policies:*`, `policies:query`],

  // PROSPECTS PERMISSIONS
  PROSPECTS_CREATE: [`prospects:*`, `prospects:create`],
  PROSPECTS_READ: [`prospects:*`, `prospects:read`, `prospects:create`, `prospects:update`, `prospects:delete`],
  PROSPECTS_UPDATE: [`prospects:*`, `prospects:update`],
  PROSPECTS_DELETE: [`prospects:*`, `prospects:delete`],

  // QUOTES PERMISSIONS
  QUOTES_CREATE: [`quotes:*`, `quotes:create`],
  QUOTES_READ: [`quotes:*`, `quotes:read`, `quotes:create`, `quotes:update`, `quotes:delete`],
  QUOTES_UPDATE: [`quotes:*`, `quotes:update`],
  QUOTES_DELETE: [`quotes:*`, `quotes:delete`],

  // REPORTS PERMISSIONS
  ALL_REPORTS_READ: [`reports:*`],
  DAILY_LEDGER_REPORTS_READ: [`reports:*`, `daily-ledger-reports:read`],
  POLICIES_REPORTS_READ: [`reports:*`, `policies-reports:read`],
  INSURED_REPORTS_READ: [`reports:*`, `insured-reports:read`],
  AGENTS_REPORTS_READ: [`reports:*`, `agents-reports:read`],

  // REFERRALS PERMISSIONS
  REFERRALS_CREATE: [`referrals:*`, `referrals:create`],
  REFERRALS_READ: [`referrals:*`, `referrals:read`, `referrals:create`, `referrals:update`, `referrals:delete`],
  REFERRALS_UPDATE: [`referrals:*`, `referrals:update`],
  REFERRALS_DELETE: [`referrals:*`, `referrals:delete`],
  
  // SYSTEM_ROLE PERMISSIONS
  SYSTEM_ROLE_CREATE: [`system-roles:*`, `system-roles:create`],
  SYSTEM_ROLE_READ: [`system-roles:*`, `system-roles:read`, `system-roles:create`, `system-roles:update`, `system-roles:delete`],
  SYSTEM_ROLE_UPDATE: [`system-roles:*`, `system-roles:update`],
  SYSTEM_ROLE_DELETE: [`system-roles:*`, `system-roles:delete`],

  // SUBSCRIBERS PERMISSIONS
  SUBSCRIBERS_CREATE: [`subscribers:*`, `subscribers:create`],
  SUBSCRIBERS_READ: [`subscribers:*`, `subscribers:read`, `subscribers:create`, `subscribers:update`, `subscribers:delete`],
  SUBSCRIBERS_UPDATE: [`subscribers:*`, `subscribers:update`],
  SUBSCRIBERS_DELETE: [`subscribers:*`, `subscribers:delete`],

  // SCRAPES PERMISSIONS
  SCRAPES_CREATE: [`scrapes:*`, `scrapes:create`],
  SCRAPES_READ: [`scrapes:*`, `scrapes:read`, `scrapes:create`, `scrapes:update`, `scrapes:delete`],
  SCRAPES_UPDATE: [`scrapes:*`, `scrapes:update`],
  SCRAPES_DELETE: [`scrapes:*`, `scrapes:delete`],

  // TWILIO PERMISSIONS
  TWILIO_CREATE: [`twilio:*`, `twilio:create`],
  TWILIO_READ: [`twilio:*`, `twilio:read`, `twilio:create`, `twilio:update`, `twilio:delete`],
  TWILIO_UPDATE: [`twilio:*`, `twilio:update`],
  TWILIO_DELETE: [`twilio:*`, `twilio:delete`],

  // TEMPLATES PERMISSIONS
  TEMPLATES_CREATE: [`templates:*`, `templates:create`],
  TEMPLATES_READ: [`templates:*`, `templates:read`, `templates:create`, `templates:update`, `templates:delete`],
  TEMPLATES_UPDATE: [`templates:*`, `templates:update`],
  TEMPLATES_DELETE: [`templates:*`, `templates:delete`],

  // TRANSACTIONS PERMISSIONS
  TRANSACTIONS_CREATE: [`transactions:*`, `transactions:create`],
  TRANSACTIONS_READ: [`transactions:*`, `transactions:read`, `transactions:create`, `transactions:update`, `transactions:delete`],
  TRANSACTIONS_UPDATE: [`transactions:*`, `transactions:update`],
  TRANSACTIONS_DELETE: [`transactions:*`, `transactions:delete`],

  // USERS PERMISSIONS
  USERS_CREATE: [`users:*`, `users:create`],
  USERS_READ: [`users:*`, `users:read`, `users:create`, `users:update`, `users:delete`],
  USERS_UPDATE: [`users:*`, `users:update`],
  USERS_DELETE: [`users:*`, `users:delete`],

  // VALIDATE PERMISSIONS
  VALIDATE_CREATE: [`validate:*`, `validate:create`],
  VALIDATE_READ: [`validate:*`, `validate:read`, `validate:create`, `validate:update`, `validate:delete`],
  VALIDATE_UPDATE: [`validate:*`, `validate:update`],
  VALIDATE_DELETE: [`validate:*`, `validate:delete`],

}