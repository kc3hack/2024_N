const LINE_TOKEN = 'E/nVXmnJ2f1yKEUlkS0xjrB7S6txzRt4ULwX6RTPfQlZ6kto5l+ZJc0xxbzW2iZyEEh6JAy1iSzAEsiVtMfnDZdiwlZaEOMRuTYUVLAl1g5OVJ8Vi8SxsfIqh/8iIf3gk8Ls7tnLTnhuLscZ1076gQdB04t89/1O/w1cDnyilFU=';
const LINE_PUSH_ENDPOINT = "https://api.line.me/v2/bot/message/push";
const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_BROADCAST_ENDPOINT = "https://api.line.me/v2/bot/message/broadcast";
const LINE_USERID = 'U8b7b305f2a9fb2429b8d44dec955bf83';

function main() {
  quickReply(LINE_TOKEN, LINE_BROADCAST_ENDPOINT, LINE_USERID);
  
}