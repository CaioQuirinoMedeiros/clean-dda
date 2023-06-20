import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<"error", "success"> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', async () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
  expect(result.value).toBe('success')
})

test('error result', async () => {
  const result = left('error')

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
  expect(result.value).toBe('error')
})
