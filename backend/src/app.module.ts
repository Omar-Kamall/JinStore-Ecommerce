import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { CouponsModule } from './coupons/coupons.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatRoomsModule } from './chat_rooms/chat_rooms.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../config';

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
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
