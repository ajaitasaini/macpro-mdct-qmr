import KafkaSourceLib from "../../../libs/kafka-source-lib";

class PostKafkaData extends KafkaSourceLib {
  topicPrefix = "aws.mdct.qmr.cdc";
  tables = ["coreSets", "measures"];
}

const postKafkaData = new PostKafkaData();

exports.handler = postKafkaData.handler.bind(postKafkaData);
