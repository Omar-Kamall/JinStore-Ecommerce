import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OtpModule } from './modules/otp/otp.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order_items/order_items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ChatRoomsModule } from './modules/chat_rooms/chat_rooms.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ChatMessagesModule } from './modules/chat_messages/chat_messages.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { WishlistsModule } from './modules/wishlists/wishlists.module';
import { CartItemsModule } from './modules/cart_items/cart_items.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [
    UsersModule,
    CartItemsModule,
    ReviewsModule,
    CategoriesModule,
    ProductsModule,
    WishlistsModule,
    ChatMessagesModule,
    NotificationsModule,
    ChatRoomsModule,
    PaymentsModule,
    OrderItemsModule,
    OrdersModule,
    CouponsModule,
    OtpModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
    AddressesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
