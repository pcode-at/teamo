import { Module } from "@nestjs/common";
import { ElasticsearchModule, ElasticsearchService } from "@nestjs/elasticsearch";
import { ConfigModule } from "@nestjs/config";
import { ElasticService } from "./elastic.service";
import { elasticSearchModuleOptions } from "./elastic.config";

@Module({
  imports: [ConfigModule
  ],
  providers: [ElasticService],
})
export class ElasticModule {}
