import * as z from "zod";

export const QueryDocTypeSchema = z.enum(["guide", "device", "category"]);
export type QueryDocType = z.infer<typeof QueryDocTypeSchema>;

export const QueryRangeSchema = z.object({
  offset: z.number().min(0),
  limit: z.number().min(0).max(200),
});

// rest
export const DataTypeSchema = z.enum(["wiki", "guide"]);
export type DataType = z.infer<typeof DataTypeSchema>;

export const NamespaceSchema = z.enum(["CATEGORY", "WIKI", "ITEM"]);
export type Namespace = z.infer<typeof NamespaceSchema>;

export const ContextEnumSchema = z.enum(["guide", "step"]);
export type ContextEnum = z.infer<typeof ContextEnumSchema>;

export const DifficultySchema = z.enum([
  "Very easy",
  "Easy",
  "Moderate",
  "Difficult",
  "Very difficult",
]);
export type Difficulty = z.infer<typeof DifficultySchema>;
export const DifficultyScoreMap: Record<Difficulty, number> = {
  "Very easy": 1,
  Easy: 2,
  Moderate: 3,
  Difficult: 4,
  "Very difficult": 5,
};

export const ScoreDifficultyMap: Record<number, Difficulty> = {
  1: "Very easy",
  2: "Easy",
  3: "Moderate",
  4: "Difficult",
  5: "Very difficult",
};

export const LangidSchema = z.enum(["de", "en", "es", "zh"]);
export type Langid = z.infer<typeof LangidSchema>;

export const GuidesByParamTypeSchema = z.enum([
  "disassembly",
  "replacement",
  "teardown",
  "technique",
]);
export type GuidesByParamType = z.infer<typeof GuidesByParamTypeSchema>;

export const StatusSchema = z.enum(["public", "private"]);
export type Status = z.infer<typeof StatusSchema>;

export const MediaTypeSchema = z.enum(["image", "video"]);
export type MediaType = z.infer<typeof MediaTypeSchema>;

export const ImageSchema = z.object({
  id: z.number().optional(),
  guid: z.string().optional(),
  mini: z.string(),
  thumbnail: z.string(),
  "140x105": z.string().optional(),
  "200x150": z.string().optional(),
  standard: z.string().optional(),
  "440x330": z.string().optional(),
  medium: z.string().optional(),
  large: z.string().optional(),
  huge: z.string().optional(),
  original: z.string().optional(),
});
export type Image = z.infer<typeof ImageSchema>;

export const CategoryInfoClassSchema = z.object({
  introduced: z.number(),
  manufacturer: z.string().optional(),
});
export type CategoryInfoClass = z.infer<typeof CategoryInfoClassSchema>;

export const CategoryListsSchema = z.record(z.unknown());
export type CategoryLgsts = z.infer<typeof CategoryListsSchema>;

export const AttrsAttrsSchema = z.object({
  level: z.number().optional(),
  align: z.string().optional(),
  caption: z.string().optional(),
  formats: z.array(z.any()).optional(),
  poster: z.string().optional(),
  rule: z.string().optional(),
  service: z.string().optional(),
  size: z.string().optional(),
  url: z.string().optional(),
});
export type AttrsAttrs = z.infer<typeof AttrsAttrsSchema>;

export const TextNodeSchema = z.object({
  type: z.string(),
  text: z.string(),
});
export type TextNode = z.infer<typeof TextNodeSchema>;

export const MarkAttrsSchema = z.object({
  href: z.string(),
  target: z.union([z.string(), z.boolean()]).optional(),
});
export type MarkAttrs = z.infer<typeof MarkAttrsSchema>;

export const DocumentSchema = z.object({
  documentid: z.number(),
  guid: z.string(),
  date: z.number(),
  size: z.number(),
  pages: z.number(),
  filename: z.string(),
  title: z.string(),
  document_extension: z.string(),
  image: ImageSchema,
  url: z.string(),
  download_url: z.string(),
  display: z.union([z.null(), z.string()]),
});
export type Document = z.infer<typeof DocumentSchema>;

export const GuidesByParamElementSchema = z.object({
  dataType: ContextEnumSchema,
  guideid: z.number(),
  locale: LangidSchema,
  revisionid: z.number(),
  modified_date: z.number(),
  prereq_modified_date: z.number(),
  url: z.string(),
  type: GuidesByParamTypeSchema,
  category: z.string(),
  subject: z.string(),
  title: z.string(),
  summary: z.string(),
  difficulty: z.union([DifficultySchema, z.null()]),
  time_required_max: z.number(),
  public: z.boolean(),
  userid: z.number(),
  username: z.string(),
  flags: z.array(z.string()),
  image: z.union([ImageSchema, z.null()]),
});
export type GuidesByParamElement = z.infer<typeof GuidesByParamElementSchema>;

export const InfoSchema = z.object({
  name: z.string(),
  value: z.string(),
  inheritedFrom: z.union([z.null(), z.string()]),
});
export type Info = z.infer<typeof InfoSchema>;

export const CategorySchema = z.object({
  tag: z.string(),
  count: z.number(),
  url: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const ToolSchema = z.object({
  title: z.string(),
  target_url: z.string(),
  image_url: z.string(),
  itemcode: z.string(),
});
export type Tool = z.infer<typeof ToolSchema>;

export const AuthorSchema = z.object({
  userid: z.number(),
  username: z.string(),
  unique_username: z.string(),
  join_date: z.number(),
  image: ImageSchema,
  reputation: z.number(),
  url: z.string(),
  teams: z.array(z.number()),
});
export type Author = z.infer<typeof AuthorSchema>;

export const ReplySchema = z.object({
  commentid: z.number(),
  locale: LangidSchema,
  context: ContextEnumSchema,
  contextid: z.number(),
  parentid: z.number(),
  author: AuthorSchema,
  title: z.string(),
  text_raw: z.string(),
  text_rendered: z.string(),
  rating: z.number(),
  date: z.number(),
  modified_date: z.number(),
  status: StatusSchema,
});
export type Reply = z.infer<typeof ReplySchema>;

export const FlagSchema = z.object({
  title: z.string(),
  flagid: z.string(),
  text: z.string(),
});
export type Flag = z.infer<typeof FlagSchema>;

export const PartSchema = z.object({
  text: z.string(),
  notes: z.null(),
  type: z.string(),
  quantity: z.number(),
  url: z.string(),
  thumbnail: z.string(),
  isoptional: z.boolean(),
});
export type Part = z.infer<typeof PartSchema>;

export const LineSchema = z.object({
  text_raw: z.string(),
  bullet: z.string(),
  level: z.number(),
  lineid: z.null(),
  text_rendered: z.string(),
});
export type Line = z.infer<typeof LineSchema>;

export const MediaSchema = z.object({
  type: MediaTypeSchema,
  data: z.array(ImageSchema),
});
export type Media = z.infer<typeof MediaSchema>;

export const SuggestGuideSchema = z.object({
  query: z.string(),
  results: z.array(GuidesByParamElementSchema),
});
export type SuggestGuide = z.infer<typeof SuggestGuideSchema>;

export const WikiSchema = z.object({
  dataType: DataTypeSchema,
  wikiid: z.number(),
  title: z.string(),
  display_title: z.string(),
  namespace: NamespaceSchema,
  summary: z.string(),
  url: z.string(),
  text: z.string(),
  image: ImageSchema,
  modified_date: z.number(),
  author: z.number(),
});
export type Wiki = z.infer<typeof WikiSchema>;

export const StickyContentSchema = z.object({
  type: z.string(),
  content: z.array(TextNodeSchema),
});
export type StickyContent = z.infer<typeof StickyContentSchema>;

export const MarkSchema = z.object({
  type: z.string(),
  attrs: MarkAttrsSchema.optional(),
});
export type Mark = z.infer<typeof MarkSchema>;

export const PartsSchema = z.object({
  url: z.string(),
  categories: z.array(CategorySchema),
});
export type Parts = z.infer<typeof PartsSchema>;

export const CommentSchema = z.object({
  commentid: z.number(),
  locale: z.union([LangidSchema, z.null()]),
  context: ContextEnumSchema,
  contextid: z.number(),
  parentid: z.null(),
  author: AuthorSchema,
  title: z.string(),
  text_raw: z.string(),
  text_rendered: z.string(),
  rating: z.number(),
  date: z.number(),
  modified_date: z.number(),
  status: StatusSchema,
  replies: z.array(ReplySchema),
});
export type Comment = z.infer<typeof CommentSchema>;

export const StepSchema = z.object({
  title: z.string(),
  lines: z.array(LineSchema),
  guideid: z.number(),
  stepid: z.number(),
  orderby: z.number(),
  revisionid: z.number(),
  media: MediaSchema,
  comments: z.array(CommentSchema),
});
export type Step = z.infer<typeof StepSchema>;

export const SuggestWikiSchema = z.object({
  query: z.string(),
  results: z.array(WikiSchema),
});
export type SuggestWiki = z.infer<typeof SuggestWikiSchema>;

export const InlineContentSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
  marks: z.array(MarkSchema).optional(),
  content: z.array(StickyContentSchema).optional(),
});
export type InlineContent = z.infer<typeof InlineContentSchema>;

export const GuideIdSchema = z.object({
  conclusion_raw: z.string(),
  conclusion_rendered: z.string(),
  difficulty: DifficultySchema,
  documents: z.array(z.any()),
  flags: z.array(FlagSchema),
  guideid: z.number(),
  image: ImageSchema,
  introduction_raw: z.string(),
  introduction_rendered: z.string(),
  featured_document_embed_url: z.string(),
  featured_document_thumbnail_url: z.string(),
  locale: LangidSchema,
  parts: z.array(PartSchema),
  prerequisites: z.array(GuidesByParamElementSchema),
  steps: z.array(StepSchema),
  subject: z.string(),
  summary: z.string(),
  time_required: z.string(),
  time_required_min: z.number(),
  time_required_max: z.number(),
  title: z.string(),
  tools: z.array(PartSchema),
  type: GuidesByParamTypeSchema,
  revisionid: z.number(),
  created_date: z.number(),
  published_date: z.number(),
  modified_date: z.number(),
  prereq_modified_date: z.number(),
  public: z.boolean(),
  comments: z.array(CommentSchema),
  category: z.string(),
  url: z.string(),
  patrol_threshold: z.number(),
  can_edit: z.boolean(),
  favorited: z.boolean(),
  author: AuthorSchema,
  langid: LangidSchema,
  featured_documentid: z.null(),
  intro_video_url: z.null(),
  intro_video: z.null(),
  completed: z.boolean(),
});
export type GuideId = z.infer<typeof GuideIdSchema>;

export const BlockContentSchema = z.object({
  type: z.string(),
  content: z.array(InlineContentSchema),
  attrs: z.array(z.any()).optional(),
});
export type BlockContent = z.infer<typeof BlockContentSchema>;

export const JsonContentContentSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
  marks: z.array(MarkSchema).optional(),
  content: z.array(BlockContentSchema).optional(),
});
export type JsonContentContent = z.infer<typeof JsonContentContentSchema>;

export const ContentsJsonContentSchema = z.object({
  type: z.string(),
  content: z.array(JsonContentContentSchema),
  attrs: z.union([z.array(z.any()), AttrsAttrsSchema]).optional(),
});
export type ContentsJsonContent = z.infer<typeof ContentsJsonContentSchema>;

export const ContentsJsonSchema = z.object({
  type: z.string(),
  content: z.array(ContentsJsonContentSchema),
});
export type ContentsJson = z.infer<typeof ContentsJsonSchema>;

export const DeviceWikiSchema = z.object({
  wikiid: z.number(),
  langid: LangidSchema,
  namespace: NamespaceSchema,
  title: z.string(),
  revisionid: z.number(),
  contents_raw: z.string(),
  contents_json: ContentsJsonSchema,
  contents_rendered: z.string(),
  can_edit: z.boolean(),
  flags: z.union([z.array(z.any()), z.any()]),
  image: z.union([ImageSchema, z.null()]),
  documents: z.array(DocumentSchema),
  author: z.number(),
  display_title: z.string(),
  page_title: z.string().nullable(),
  ancestors: z.array(WikiSchema),
  description: z.string(),
  children: z.array(WikiSchema),
  category_lists: CategoryListsSchema,
  featured_guides: z.array(GuidesByParamElementSchema),
  guides: z.array(GuidesByParamElementSchema),
  related_wikis: z.array(WikiSchema),
  solutions_url: z.string(),
  parts: PartsSchema,
  tools: z.array(ToolSchema),
  repairability_score: z.union([z.number(), z.null()]),
  category_info: z.union([z.array(z.any()), CategoryInfoClassSchema]),
  source_revisionid: z.null(),
  diagrams: z.array(z.any()),
  info: z.array(InfoSchema),
});
export type DeviceWiki = z.infer<typeof DeviceWikiSchema>;
