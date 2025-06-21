import {
  DeviceWikiSchema,
  DifficultyScoreMap,
  ScoreDifficultyMap,
  SuggestWikiSchema,
  type DeviceWiki,
  type Namespace,
  type QueryDocType,
  type Wiki,
} from "@/types/ifixit";
import axios, { type AxiosRequestConfig } from "axios";
import { buildQuery } from "./utils";
import type { z } from "zod";

export const ifixitAPI = axios.create({
  baseURL: "https://www.ifixit.com/api/2.0",
  timeout: 5000,
  paramsSerializer: buildQuery,
});

async function fetchAndParse<T>({
  url,
  schema,
  config,
}: {
  url: string;
  schema: z.ZodSchema<T>;
  config?: AxiosRequestConfig;
}) {
  const res = await ifixitAPI.get(url, config);
  const parsed = schema.safeParse(res.data);
  if (!parsed.success) {
    console.error("data recieved =>", res.data);
    console.error("error =>", parsed.error);
    throw new Error("Invalid response", parsed.error);
  }
  return parsed.data;
}

export class IFixit {
  suggestDevice({
    query,
    params,
  }: {
    query: string;
    params: { doctypes: QueryDocType };
  }) {
    return fetchAndParse({
      url: `/suggest/${encodeURIComponent(query)}`,
      schema: SuggestWikiSchema,
      config: { params },
    });
  }

  getDeviceWiki(wiki: Wiki) {
    return fetchAndParse({
      url: `/wikis/${wiki.namespace}/${encodeURIComponent(wiki.title)}`,
      schema: DeviceWikiSchema,
    });
  }

  getDeviceWikiFromNamespaceTitle(
    namespace: Namespace,
    title: string,
  ): Promise<DeviceWiki> {
    return fetchAndParse({
      url: `/wikis/${namespace}/${title}`,
      schema: DeviceWikiSchema,
    });
  }

  getCategories() {
    return ifixitAPI
      .get<{
        display_titles: Record<string, string>;
        hierarchy: Record<string, unknown>;
      }>("wikis/CATEGORY?display=hierarchy")
      .then((r) => r.data.display_titles);
  }

  async infoFromTitle(title: string) {
    return this.info(
      await this.getDeviceWikiFromNamespaceTitle(
        "CATEGORY",
        encodeURIComponent(title),
      ),
    );
  }

  info(device: DeviceWiki) {
    const {
      guides,
      featured_guides,
      tools,
      parts,
      related_wikis,
      repairability_score,
    } = device;

    const allGuides = [...guides, ...featured_guides];
    const num_guides = guides.length;
    const num_featured_guides = featured_guides.length;
    const num_total_guides = allGuides.length;

    const difficultyScores = allGuides
      .map((guide) => DifficultyScoreMap[guide.difficulty!])
      .filter((score): score is number => typeof score === "number");

    const avg_diff_num = difficultyScores.length
      ? Math.ceil(
          difficultyScores.reduce((sum, score) => sum + score, 0) /
            difficultyScores.length,
        )
      : undefined;

    const avg_diff_word =
      avg_diff_num != undefined ? ScoreDifficultyMap[avg_diff_num] : undefined;

    const num_tools = tools.length;
    const num_part_types = parts.categories.length;
    const num_all_parts = parts.categories.reduce(
      (sum, category) => sum + category.count,
      0,
    );
    const num_related_wikis = related_wikis.length;

    const ourScore = Math.min(10, Math.max( 0, (avg_diff_num ? (9.3095 + (3.5655 * num_guides) - (0.4709 * num_featured_guides) - (2.2590 * num_total_guides) - (1.2294 * num_tools) - (0.0875 * num_part_types) - (0.001677 * num_all_parts) + (1.2970 * num_related_wikis) - (0.6026 * avg_diff_num)) :
                                                                       (9.3094 + (3.5655 * num_guides) - (0.4709 * num_featured_guides) - (2.2590 * num_total_guides) - (1.2294 * num_tools) - (0.0875 * num_part_types) - (0.0017 * num_all_parts) + (1.2970 * num_related_wikis)))))



    return {
      repairability_score,
      num_guides,
      num_featured_guides,
      num_total_guides,
      num_tools,
      num_part_types,
      num_all_parts,
      num_related_wikis,
      average_difficulty: {
        number: avg_diff_num,
        word: avg_diff_word,
      },
      ourScore
    };
  }
}
