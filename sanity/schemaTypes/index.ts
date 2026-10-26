import { blogPost } from "@/sanity/schemaTypes/blogPost";
import { faqItem } from "@/sanity/schemaTypes/faqItem";
import { priceItem } from "@/sanity/schemaTypes/priceItem";
import { review } from "@/sanity/schemaTypes/review";
import { service } from "@/sanity/schemaTypes/service";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { workExample } from "@/sanity/schemaTypes/workExample";

export const schemaTypes = [service, priceItem, review, workExample, blogPost, faqItem, siteSettings];
