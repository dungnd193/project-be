import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Order } from 'src/order/order.entity';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private authService: AuthService,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) { }

    async requestPermissionReview(req: any, pId: { productId: string }): Promise<any> {
        const { id } = await this.authService.getUserInfo(req)
        const query = this.orderRepository.createQueryBuilder('order');
        const orderSuccess = await query
            .where({ status: 'COMPLETED' })
            .getMany();

        const orderOfUser = orderSuccess.filter(order => order.user_id === id)

        let isBought = 0;
        orderOfUser.forEach(order => {
            const found = order.order_list.find(item => item.id === pId.productId)
            if (found) {
                isBought++;
            }
        })

        return { reviewPermission: isBought && true || false }
    }

    async createReview(reviewDto: CreateReviewDto) {
        try {
            const review = this.reviewRepository.save(reviewDto);

            return review;
        } catch (error) {
            console.error(error);
        }
    }

    async getReviewByProductId(pId: { productId: string }) {
        try {
            const query = this.reviewRepository.createQueryBuilder('review');
            const reviews = await query
                .where({ product_id: pId.productId })
                .getMany();
            
            return reviews
        } catch (error) {
            console.error(error)
        }
    }
}