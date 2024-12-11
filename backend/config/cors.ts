import cors from "cors";
import type { CorsOptions } from "cors";

const options: CorsOptions = {}

export default () => cors(options);