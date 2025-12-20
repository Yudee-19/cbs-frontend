import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
    onFilesChanged: (files: File[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    className?: string;
}

export function FileUploader({
    onFilesChanged,
    maxFiles = 5,
    maxSizeMB = 50,
    acceptedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    className,
}: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const validateFile = (file: File) => {
        if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
            console.warn(`File type ${file.type} not supported`);
            return false;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            console.warn(`File size exceeds ${maxSizeMB}MB`);
            return false;
        }
        return true;
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
        },
        [files]
    );

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFiles = (newFiles: File[]) => {
        const validFiles = newFiles.filter(validateFile);

        if (files.length + validFiles.length > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        onFilesChanged(updatedFiles);
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChanged(updatedFiles);
    };

    return (
        <div className={cn("w-full", className)}>
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-all duration-200 ease-in-out",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-muted-foreground/25 bg-background",
                    "hover:bg-accent/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Upload className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            Drag and drop documents here
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Supports: pdf, doc, docx
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Max size: {maxSizeMB}MB • Maximum {maxFiles} files
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    >
                        Browse Files
                    </Button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept={acceptedTypes.join(",")}
                    onChange={handleFileInput}
                />
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="group flex items-center justify-between p-2.5 border rounded-md bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <div className="p-2 rounded bg-primary/10">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </span>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFile(index)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
