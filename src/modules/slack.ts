import axios from 'axios';

import config from '../config';

const sendSlackMessage = async (message: string) => {
  const res = await axios.post(config.webHookUrl, { text: message });
  return res.status === 200; // 성공헀는지 유무 전달
};

export default sendSlackMessage;
