# UseCase

- **Business logic**: focuses on the WHAT the product team needs to achieve when they describe to us the task. A good indicator that your use-case is doing only business logic would be if you can use it in a different platform like iOS.

- **Single task**: A use-case should have only one task — mostly one public function- to be concerned about.
- **Naming 🔤**: The use-case class naming is simple: verb in present tense + noun/what (optional) + UseCase.
  > Examples: FormatDateUseCase, GetChatUserProfileUseCase, RemoveDetektRulesUseCase, etc.
- **Thread safety 🧵**
  Use cases should be main-thread safe, meaning that any heavy operation is handled on a separate thread, and the use-case remains callable from the main-thread.
- **Red Flags for Use-cases 🚩🚩🚩🚩**:
  - Having any non-domain class as input, output, or in the body of the use-case like ui-models, data-models, Android-related imports or ui-domain/domain-data mappers.
  - Having more than 1 public function unless it’s an overload for the same responsibility…

...

## References

- [Clean Architecture: Use Cases](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [UseCase Red Flags and Best Practices in Clean Architecture](https://engineering.teknasyon.com/usecase-red-flags-and-best-practices-in-clean-architecture-76e2f6d921eb)
