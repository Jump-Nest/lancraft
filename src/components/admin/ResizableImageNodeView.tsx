"use client";

import React, { useEffect, useRef } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";

export function ResizableImageNodeView(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const wrapperRef = useRef<HTMLElement | null>(null);
  const startXRef = useRef(0);
  const containerWidthRef = useRef(0);
  const startWidthPercentRef = useRef(100);
  const isResizingRef = useRef(false);

  const { src, alt, width, float } = node.attrs as {
    src: string;
    alt?: string | null;
    width?: number | string;
    float?: "none" | "left" | "right";
  };

  const numericWidth =
    typeof width === "number" ? width : width !== undefined ? Number(width) : NaN;
  const widthPercent = !Number.isNaN(numericWidth) ? numericWidth : 100;

  const floatValue: "none" | "left" | "right" = float ?? "none";

  const floatClasses =
    floatValue === "left"
      ? "float-left mr-4 my-2"
      : floatValue === "right"
      ? "float-right ml-4 my-2"
      : "my-4";

  function stopResizing() {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isResizingRef.current) return;
    event.preventDefault();

    const deltaX = event.clientX - startXRef.current;
    const containerWidth = containerWidthRef.current || 1;
    const deltaPercent = (deltaX / containerWidth) * 100;

    const newWidthPercent = Math.max(
      10,
      Math.min(100, startWidthPercentRef.current + deltaPercent)
    );

    updateAttributes({ width: newWidthPercent });
  }

  function handleMouseUp() {
    stopResizing();
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!wrapperRef.current) return;

    const parentRect =
      wrapperRef.current.parentElement?.getBoundingClientRect();

    startXRef.current = event.clientX;
    startWidthPercentRef.current = widthPercent;
    containerWidthRef.current = parentRect?.width ||
      wrapperRef.current.getBoundingClientRect().width;
    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      stopResizing();
    };
  }, []);

  return (
    <NodeViewWrapper
      as="span"
      ref={wrapperRef}
      className={`relative inline-block ${floatClasses} ${
        selected ? "ring-2 ring-yellow-400" : ""
      }`}
      style={{ width: `${widthPercent}%`, maxWidth: "100%" }}
      data-drag-handle
    >
      <img
        src={src}
        alt={alt || ""}
        className="block h-auto w-full rounded-lg shadow-md"
        draggable={false}
      />
      <div
        className="absolute bottom-1 right-1 h-3 w-3 cursor-se-resize rounded-sm border border-zinc-900 bg-yellow-400 sm:h-4 sm:w-4"
        onMouseDown={handleMouseDown}
      />
    </NodeViewWrapper>
  );
}

