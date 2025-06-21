import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { IFixit } from "@/lib/ifixit";
import { NamespaceSchema, WikiSchema, type DeviceWiki } from "@/types/ifixit";

export const ifixitRouter = createTRPCRouter({
  suggest: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query } }) => {
      const ifixit: IFixit = new IFixit();
      return ifixit.suggestDevice({ query, params: { doctypes: "device" } });
    }),

  suggestDevice: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(({ input: { query } }) => {
      const ifixit: IFixit = new IFixit();
      return ifixit.suggestDevice({ query, params: { doctypes: "device" } });
    }),

  deviceWiki: publicProcedure
    .input(z.object({ wiki: WikiSchema }))
    .query(({ input: { wiki } }) => {
      const ifixit: IFixit = new IFixit();
      return ifixit.getDeviceWiki(wiki);
    }),

  deviceWikiFromNamespaceTitle: publicProcedure
    .input(z.object({ namespace: NamespaceSchema, title: z.string() }))
    .query(({ input: { namespace, title } }): Promise<DeviceWiki> => {
      const ifixit: IFixit = new IFixit();
      return ifixit.getDeviceWikiFromNamespaceTitle(namespace, title);
    }),

  getCategories: publicProcedure.query(() => {
    const ifixit = new IFixit();
    return ifixit.getCategories();
  }),
});
