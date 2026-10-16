export enum EUserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
}

export enum EOrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum EPaymentMethod {
  PYMOBILE = 'PYMOBILE',
  PAYPAL = 'PAYPAL',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum EPaymentStatus {
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum ENotificationType {
  ORDER_STATUS = 'ORDER_STATUS',
  OTP = 'OTP',
}
