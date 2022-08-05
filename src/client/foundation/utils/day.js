import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";

dayjs.locale("ja");
dayjs.extend(utc);

export { dayjs };
