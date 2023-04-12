// TODO: implement different general template formats
// TODO: custom tags
// TODO: optional open/close names (e.g.: closing name tag can be optional)
// TODO: implement data key - case insensitive match (e.g.: ConTEnT => content)
// TODO: implement respecting whitespace before and after content

// const pattern = /(<!---\s*<%\s*)([\w.]+)(\s*--->\n)(.*?)(\n?<!---\s*)([\w.]+)(\s*%>\s*--->)/gis

const pattern = [

  // open tag ------------------------------------------------------------------
  '(<!---\\s*<%\\s*)',

  // tag name ------------------------------------------------------------------
  '([\\w.]+)',

  '(\\s*--->(?:\\r?\\n|\\r))',

  // content -------------------------------------------------------------------
  '(.*?)',

  // close tag -----------------------------------------------------------------
  '((?:\\r?\\n|\\r)?<!---\\s*)',

  // tag name ------------------------------------------------------------------
  '([\\w.]*)',

  '(\\s*%>\\s*--->)'

].join('')

const regex = new RegExp(pattern, 'gis')

export interface Result {
  content: string
  numReplaced: number
}

export const replace = (content: string, data: Record<string, any>): Result => {
  let numReplaced = 0

  const newContent = content.replace(
    regex,
    (
      fullMatch: string,
      openA: string,
      tagNameA: string,
      openB: string,
      content: string,
      closeA: string,
      tagNameB: string,
      closeB: string
    ) => {
      if (tagNameA in data) {
        content = data[tagNameA]
        numReplaced++
      } else {
        return fullMatch
      }

      tagNameB = tagNameB ?? ''

      return (
        openA + tagNameA + openB +
          content +
        closeA + tagNameB + closeB
      )
    }
  )

  return {
    content: newContent,
    numReplaced
  }
}
