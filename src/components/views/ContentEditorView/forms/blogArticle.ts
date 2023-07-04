/**
 * Anything with the _services.upload metadata set to true means that the services should
 * upload this asset to the CMS.
 * Services uses data from within the "_services" property on each field. Notable the
 * "_fieldHandle" should reflect what the field is named in the CMS.
 */
import { EFormType, IFormDetailsSingle } from "next-shared/src/types/formTypes";

/**
 * All imageUpload inputs have the useGuidForFileName prop set to true. Do NOT change this.
 * Unfortunately when craft senses duplicate images (in s3), it attempts to solve this by
 * adding in a date time, unique to the second only. What this means is that if someone uploads
 * images with the exact same filename, then craft will overwrite whatever is stored in s3
 * with the aforementioned "unique by the second" file name.
 */

const UPLOAD_DIRECTORY = "temp-cms-assets";

const MAX_ASSET_FILE_SIZE = 1e7; // 10MB

export const blogArticleSchema: IFormDetailsSingle = {
  type: EFormType.Single,
  title: "Blog article",
  fields: [
    {
      // required to allow existing articles to be updated
      type: "hidden",
      map: "slug",
    },
    {
      type: "text",
      label: "Title",
      map: "title",
      maxLength: 255,
      required: true,
    },
    {
      type: "imageUpload",
      label: "Poster Image",
      map: "_posterImage",
      required: true,
      uploadNameSpace: UPLOAD_DIRECTORY,
      maxImages: 1,
      useGuidForFileName: true,
      maxFileSize: MAX_ASSET_FILE_SIZE,
      metadata: {
        _fieldHandle: "articlePosterImage",
      },
    },
    {
      type: "options",
      map: "_author",
      label: "Article Author",
      description:
        "The author to attribute the article to. If the author you wish to select is not displayed here, please contact head office.",
      variant: "dropdown",
      options: [],
      remoteSuggestionValidator: "CmsAuthorsForLocation",
      suggestion: {
        prop: "options",
        name: "CmsAuthorsForLocation",
      },
    },
    // TODO - the CMS doesn't have a limit assigned for article length?
    {
      type: "richContent",
      label: "Lead",
      description: "The lead paragraph. This is used for the preview text.",
      map: "_lead",
      maxLength: 300,
      required: true,
      redactorConfig: {
        buttons: ["bold", "italic"],
        toolbarFixed: false,
      },
    },
    // TODO - the CMS doesn't have a limit assigned for article length?
    {
      type: "richContent",
      label: "Content",
      map: "_content",
      required: true,
      redactorConfig: {
        buttons: ["bold", "italic", "lists", "link"],
        toolbarFixed: false,
      },
    },
    {
      type: "imageUpload",
      label: "Gallery",
      map: "_gallery",
      uploadNameSpace: UPLOAD_DIRECTORY,
      maxFileSize: MAX_ASSET_FILE_SIZE,
      useGuidForFileName: true,
      // TODO - finalise this number
      maxImages: 5,
      metadata: {
        _fieldHandle: "gallery",
      },
    },
    {
      type: "group",
      label: "Visibility",
      fields: [],
    },
    // HACK form doesn't pass values through properly when placed in a group
    {
      type: "boolean",
      label: "Foyer",
      map: "visibilityFoyer",
      description: "Display this article on the foyer screen?",
      required: true,
    },
    {
      type: "boolean",
      map: "visibilityCompanion",
      label: "Companion app",
      description: "Display this article on the companions?",
      required: true,
    },
    {
      type: "boolean",
      label: "Clinic website",
      description: "Display this article on the clinic blog page?",
      map: "visibilityLocationBlog",
      required: true,
    },
  ],
};
