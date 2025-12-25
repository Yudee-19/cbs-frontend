import axios, { type AxiosResponse } from 'axios';


export interface PresignedUrlRequest {
  type: string;
  files: Array<{
    filename: string;
    mimeType: string;
    size: number;
  }>;
}

export interface PresignedUrlFile {
  filename: string;
  presignedUrl: string;
  s3Key: string;
  publicUrl: string;
  expiresIn: number;
}

export interface PresignedUrlResponse {
  success: boolean;
  message: string;
  data: {
    files: PresignedUrlFile[];
  };
  timestamp: string;
}

// ===== FILE UPLOAD SERVICE FUNCTIONS =====

const API_URLS = "https://company-documnets.onrender.com/api/file-upload/presigned-urls"

async function handleAxios<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await p;
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data
        ? typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data)
        : err?.message ?? String(err);
    throw new Error(msg);
  }
}

/**
 * Get presigned URLs for file uploads
 * @param type - Type of entity (e.g., "gem")
 * @param files - Array of file metadata
 * @returns Promise with presigned URLs
 */
export async function getPresignedUrls(
  type: string,
  files: Array<{
    filename: string;
    mimeType: string;
    size: number;
    fileType: 'certificate';
  }>
): Promise<PresignedUrlResponse> {
  return handleAxios<PresignedUrlResponse>(
    axios.post(
      API_URLS,
      { type, files },
      { headers: { "Content-Type": "application/json" } }
    )
  );
}

/**
 * Upload file to S3 using presigned URL
 * @param presignedUrl - The presigned URL from the backend
 * @param file - The file to upload
 * @param mimeType - The MIME type of the file
 * @returns Promise<void>
 */
export async function uploadFileToS3(
  presignedUrl: string,
  file: File,
  mimeType: string
): Promise<void> {
  await handleAxios<any>(
    axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": mimeType,
      },
    })
  );
}