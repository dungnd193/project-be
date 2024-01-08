import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) { }
    @Post('request')
    requestPermissionReview(@Req() req: any, @Body() pId: { productId: string }) {
        return this.reviewService.requestPermissionReview(req, pId)
    }

    @Post()
    createReview(@Body() reviewDto: CreateReviewDto) {
        return this.reviewService.createReview(reviewDto)
    }

    @Get()
    getReviewByProductId(@Query() pId: { productId: string }) {
        return this.reviewService.getReviewByProductId(pId)
    }


}
