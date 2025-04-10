import Prediction from "../models/predictionModel.js";

import { StatusCodes } from "http-status-codes";
 
import tf from "@tensorflow/tfjs-node";
 
import sharp from "sharp";

import {

  getDroughtPredictionDescription,

  getGoodPredictionDescription,

} from "../utils/determineDescriptions.js";
 
const f_name = `/Users/user/Desktop/projects/crop-screening-server/tfModel/model.json`;
 
const file_path = `file://${f_name}`;
 
async function loadModel() {

  try {

    const model = await tf.loadGraphModel(`${file_path}`);

    console.log("model is loaded");

    return model;

  } catch (error) {

    console.log(`failed to load tf model - ${error}`);

    throw error;

  }

}
 
async function predictUsingModel(data) {

  try {

    const loadedModel = await loadModel();

    const input_tensor = tf.tensor(data);

    const prediction = loadedModel.predict(input_tensor);

    console.log("predictions: ", prediction);

    return prediction.dataSync();

  } catch (error) {

    console.log(error);

    throw error;

  }

}
 
export async function getPredictions(req, res) {

  try {

    const user_history = await Prediction.find({})

      .sort({ createdAt: -1 })

      .exec();
 
    return res.status(StatusCodes.OK).json({

      status: "success",

      user_history,

      message: "your history has been retrieved",

    });

  } catch (error) {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      status: `failed - ${StatusCodes.INTERNAL_SERVER_ERROR}`,

      message: `${error}`,

    });

  }

}
 
export async function createPrediction(req, res) {

  try {

    if (!req.file) {

      return res.status(StatusCodes.BAD_REQUEST).json({

        message: "No file uploaded",

      });

    }
 
    const uploaded_file = req.file.path.toString();
 
    const processedImageBuffer = await sharp(req.file.path.toString())

      .resize(256, 256)

      .raw()

      // .ensureAlpha(0)

      .toBuffer({ resolveWithObject: true });
 
    const ImageBuffer = await sharp(req.file.path.toString())

      .resize(180, 180)

      .raw()

      .toBuffer({ resolveWithObject: true });
 
    const { data, info } = processedImageBuffer;
 
    const reshapedImage = tf

      .tensor(data, [info.height, info.width, info.channels])

      .toFloat()

      .reshape([-1, 256, 256, 3]);
 
    const results = reshapedImage.toInt().arraySync();

    const prediction = await predictUsingModel(results);
 
    const drought = prediction[0];

    const goodHealth = prediction[1];
 
    if (!prediction) {

      const err = "Sorry an error occurred while performing a prediction.";
 
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

        status: "failed",

        message: `${err}`,

      });

    }

    const droughtResults = parseFloat(drought).toPrecision(6) * 100;

    const goodHealthResults = parseFloat(goodHealth).toPrecision(6) * 100;

    const dr_res = droughtResults.toFixed(2);

    const g_res = goodHealthResults.toFixed(2);
 
    var uri;

    var prediction_description;

    var prediction_state;

    var damage;

    var crop_state;

    var crop_state_description;

    var user_id;
 
    //   const file_img = req.file.buffer;

    console.log(uploaded_file);
 
    if (dr_res > g_res) {

      (prediction_state = dr_res.toString()),

        (uri = uploaded_file),

        (user_id = req.body.user_id),

        (crop_state = "Affected"),

        (damage = "Drought");

      if ((dr_res) >= 50 && dr_res < 60) {

        prediction_description = `The assessment for drought stress is inconclusive. The evaluation states ${dr_res}% effects. The crop does't require exclusion monitoring. Consider normal regulations of farming.`;

        crop_state_description = `Continue current maintenance practices as they align with the crop's optimal health conditions.`;

      } else if ((dr_res) >= 60 && dr_res < 70) {

        prediction_description = `Your crop health assessment for this image suggests a less likelihood of drought stress effect, showing ${dr_res}% stats of impact. Consider monitoring weather conditions and patterns for any changes.`;

        crop_state_description = `Increase environmental monitoring, focusing on soil conditions, weather forecasts, and pest activities.`;

      } else if (dr_res >= 70 && dr_res < 80) {

        prediction_description = `A moderate drought stress likelihood has been detected in the crop, showing ${dr_res}% effect in the crop. Consider proactive measures such as water conversation and soil moisture monitoring.`;

        crop_state_description = `Increase environmental monitoring, focusing on soil conditions, weather forecasts, and pest activities.`;

      } else {

        prediction_description = `A high drought stress has been detected in the crop, showing ${dr_res}% effect in the crop. An immediate action of increased irrigation or shading is recommended to mitigate this condition. Please adhere to the recommendations.`;

        crop_state_description = `Adapt irrigation practices to fluctuating weather patterns and consider water-saving techniques.`;

      }

    }
 
    if (g_res > dr_res) {

      (prediction_state = g_res.toString()),

        (uri = uploaded_file),

        (user_id = req.body.id),

        (crop_state = "Not Affected"),

        (damage = "Good Health");
 
      if ((g_res) >= 50 && g_res < 60) {

        prediction_description = `The assessment suggests good health, but with uncertainty. Further analysis and data collection are essential for a clearer understanding. The evaluation summary shows ${g_res}% of the crop good conditions.`;

        crop_state_description = `Focus on comprehensive data collection for a more accurate assessment of environmental and crop conditions`;

      } else if ((g_res) >= 60 && g_res < 70) {

        prediction_description = `The assessment suggests good health, but with uncertainty with less ${g_res}% of the crop good conditions. Conduct feather analysis on the assessment of the crop.`;

        crop_state_description = `Intensify monitoring efforts, collect additional data, and consider multiple sources to gain a clearer picture of the crop's health.`;

      } else if (g_res >= 70 && g_res < 80) {

        prediction_description = `Your crop health evaluation indicates satisfactory conditions with potential risks. Stay vigilant and monitor weather patterns for any changes.`;

        crop_state_description = `Monitor weather patterns for any potential changes and maintain vigilance despite the current positive forecast.`;

      } else {

        prediction_description = `Congratulations! Your crop health assessment indicates optimal conditions. Maintain your current practices for continued success and yield.`;

        crop_state_description = `Continue current maintenance practices as they align with the crop's optimal health conditions.`;

      }

    }
 
    const prediction_results = await Prediction.create({

      uri: uri,

      prediction_description: prediction_description,

      prediction_state: prediction_state,

      damage: damage,

      crop_state: crop_state,

      crop_state_description: crop_state_description,

      user_id: user_id,

    });
 
    return res.status(StatusCodes.OK).json({

      status: "success",

      prediction_results,

      message: "Prediction successfully created.",

    });
 
    //   next();

  } catch (error) {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      status: `failed - ${StatusCodes.INTERNAL_SERVER_ERROR}`,

      message: `${error}`,

    });

  }

}
 