/**
 * SVG-path’ы «кубической» кнопки.
 *
 * Исходные координаты — в **дизайн-пространстве** (см. --cubic-svg-coord-w/h в стилях компонента).
 * При рендере кнопка имеет фактическую ширину/высоту в px; мы масштабируем Y (и пропорционально
 * высоте) и **сдвигаем** правую часть фигуры по X, чтобы при ширине > эталона тянулась «глубина».
 */

export interface CubicPathScaler {
  /** Масштаб координаты без учёта растягивания по ширине */
  s: (designUnit: number) => string
  /** Координата X с учётом сдвига для растягивания правого скоса */
  shifted: (designX: number) => string
}

/**
 * @param layoutHeightPx — фактическая высота кнопки (px)
 * @param coordHeight — высота дизайн-системы path (без единиц, как в CSS-переменной)
 * @param layoutWidthPx — фактическая ширина кнопки (px)
 * @param coordWidth — ширина дизайн-системы path
 */
export function createCubicPathScaler(
  layoutHeightPx: number,
  coordHeight: number,
  layoutWidthPx: number,
  coordWidth: number,
): CubicPathScaler | null {
  if (coordHeight <= 0 || coordWidth <= 0) {
    return null
  }
  const scale = layoutHeightPx / coordHeight
  const baseWidthScaled = coordWidth * scale
  const rightShift = layoutWidthPx - baseWidthScaled

  return {
    s: (n) => (n * scale).toFixed(4),
    shifted: (n) => (n * scale + rightShift).toFixed(4),
  }
}

export interface CubicSurfacePaths {
  /** Плоскость под текстом */
  front: string
  /** Правый скос (изометрия) */
  right: string
  /** Верхний скос */
  top: string
}

/** Заливка «тела» кнопки (жёлтые плоскости в дефолтной теме). */
export function buildCubicSurfacePaths(sc: CubicPathScaler): CubicSurfacePaths {
  const { s, shifted } = sc

  return {
    front: `M${s(2.5)} ${s(82)}H${shifted(270.451)}V${s(11.1084)}H${s(2.5)}V${s(82)}Z`,
    right: `M${shifted(278.736)} ${s(5.49121)}C${shifted(276.987)} ${s(7.15715)} ${shifted(274.801)} ${s(9.13857)} ${shifted(272.951)} ${s(10.5)}V${s(81.0547)}L${shifted(280)} ${s(76.873)}V${s(4.26953)}C${shifted(279.612)} ${s(4.64878)} ${shifted(279.188)} ${s(5.06149)} ${shifted(278.736)} ${s(5.49121)}Z`,
    top: `M${s(7.33789)} ${s(8.6084)}H${shifted(271.303)}C${shifted(273.034)} ${s(7.35949)} ${shifted(275.203)} ${s(5.40398)} ${shifted(277.012)} ${s(3.68164)}C${shifted(277.447)} ${s(3.2667)} ${shifted(277.859)} ${s(2.8675)} ${shifted(278.234)} ${s(2.5)}H${s(21.584)}L${s(7.33789)} ${s(8.6084)}Z`,
  }
}

/** Обводка / тёмная рамка вокруг формы (evenodd). */
export function buildCubicFramePath(sc: CubicPathScaler, surfaces: CubicSurfacePaths): string {
  const { s, shifted } = sc
  const { front, right, top } = surfaces

  const frameTail = `M${shifted(282.5)} ${s(77.5859)}C${shifted(282.5)} ${s(78.027)} ${shifted(282.267)} ${s(78.4351)} ${shifted(281.888)} ${s(78.6602)}L${shifted(272.339)} ${s(84.3252)}C${shifted(272.146)} ${s(84.4397)} ${shifted(271.926)} ${s(84.5)} ${shifted(271.701)} ${s(84.5)}H${s(1.25)}C${s(0.559644)} ${s(84.5)} ${s(0)} ${s(83.9404)} ${s(0)} ${s(83.25)}V${s(9.8584)}C${s(6.09876e-5)} ${s(9.35849)} ${s(0.29834)} ${s(8.90695)} ${s(0.757812)} ${s(8.70996)}L${s(20.8359)} ${s(0.101562)}C${s(20.9916)} ${s(0.034834)} ${s(21.1598)} ${s(0)} ${s(21.3291)} ${s(0)}H${shifted(281.25)}C${shifted(281.94)} ${s(0)} ${shifted(282.5)} ${s(0.559644)} ${shifted(282.5)} ${s(1.25)}V${s(77.5859)}Z`

  return `${front} ${right} ${top} ${frameTail}`
}
